#################
動態新增新聞
#################

你現在知道如何使用 CodeIgniter 從資料庫中讀取資料，但資料庫中尚未寫入任何資訊。
在這一章節你將會擴充你先前做的 news 控制器及模型來增加這個功能。

建立一個表單
-------------

為了要輸入資料到資料庫當中，你需要建立一個表單讓你可以輸入要儲存的資訊。
這代表你需要一個有兩個欄位的表單，一個用來輸入標題，另一個輸入內文。
你將會在模型中將標題製成 slug，現在到 *application/views/news/create.php* 建立新的檢視。

::

    <h2><?php echo $title ?></h2>

    <?php echo validation_errors(); ?>

    <?php echo form_open('news/create') ?>

        <label for="title">Title</label> 
        <input type="input" name="title" /><br />

        <label for="text">Text</label>
        <textarea name="text"></textarea><br />

        <input type="submit" name="submit" value="Create news item" /> 

    </form>

裡面只有兩個東西你可能不熟悉：``form_open()`` 函式以及 ``validation_errors()`` 函式。

第一個函式是由 `Form
輔助函式 <../helpers/form_helper.html>`_  所提供的，它將會顯示表單元素並增加一些額外功能。
例如增加一個隱藏的 `CSRF 預防欄位 <../libraries/security.html>`_ 。第二個函式則是當表單驗證錯誤時，用來顯示錯誤訊息。

回到你的 news 控制器。在這邊你將要做兩件事情，檢查是否有表單被送出，以及送出的資料是否通過驗證規則。
我們將使用 `Form 驗證 <../libraries/form_validation.html>`_ 程式庫來做這件事。

::

    public function create()
    {
        $this->load->helper('form');
        $this->load->library('form_validation');
        
        $data['title'] = 'Create a news item';
        
        $this->form_validation->set_rules('title', 'Title', 'required');
        $this->form_validation->set_rules('text', 'text', 'required');
        
        if ($this->form_validation->run() === FALSE)
        {
            $this->load->view('templates/header', $data);   
            $this->load->view('news/create');
            $this->load->view('templates/footer');
            
        }
        else
        {
            $this->news_model->set_news();
            $this->load->view('news/success');
        }
    }

上面這段程式增加了許多功能。
開頭前幾行用來載入 Form 輔助函式以及 Form Validation 程式庫。
接著是設定表單驗證的規則。
``set_rules()`` 方法需要三個參數，輸入欄位的名稱，用來顯示在錯誤訊息中的名稱，以及規則。
在這個例子中使用的規則，用來表示標題及內文都是必要的欄位。

如上面的範例， CodeIgniter 有一個強力的表單驗證程式庫。
你可以在這邊閱讀 `更多關於表單驗證的資訊 <../libraries/form_validation.html>`_ 。

繼續往下看，你可以看到一個條件式用來檢查表單驗證是否成功。
若是沒有，就會顯示表單，若是表單已被送出 並且 通過了驗證，模型就會被呼叫。 接著一個檢視會被載入並顯示成功訊息。
請在 *application/view/news/success.php* 建立一個檢視並寫入成功訊息。

模型（Model）
-----------

最後一件事就是寫一個方法來將資料存進資料庫。
你將會使用 Active Record 類別來新增這資訊，並使用 Input 程式庫來取得表單送出的資料。
打開之前建立的模型，並加入下列程式碼:

::

    public function set_news()
    {
        $this->load->helper('url');
        
        $slug = url_title($this->input->post('title'), 'dash', TRUE);
        
        $data = array(
            'title' => $this->input->post('title'),
            'slug' => $slug,
            'text' => $this->input->post('text')
        );
        
        return $this->db->insert('news', $data);
    }

這個新方法用來新增資料到資料庫中。
在第三行有個新的 url_title() 函式。
這個函式 - 由 `URL 輔助函式 <../helpers/url_helper.html>`_ 提供 - 會讀取你傳入的字串，使用破折號 (-) 來替換掉空白，並將所有字串轉為小寫。
最後會產生一個很好的 slug ，非常適合用來建立 URI 。

我們繼續處理待會要存入的資料，將其放進 ``$data`` 陣列中。
陣列中的每個元素都對應到我們建立的資料庫中的欄位。
你可能注意到這邊有個新的函式叫做 ``post()`` ，它來自 `Input 函式庫 <../libraries/input.html>`_ 。
這個方法用來確保資料已經被消毒，可以避免你受到令人討厭的攻擊。而這個程式庫預設就會被自動載入。
最後，我們將 ``$data`` 存入資料庫當中。

路由（Routing）
---------------

在你開始新增項目進去你的 CodeIgniter 應用程式之前，你需要在 *config/routes.php* 中增加額外的規則。
確認你的檔案中含有下列項目。這讓 CodeIgniter 看到 'create' 時，當作是一個方法，而不是一個新聞的 slug 。

::

    $route['news/create'] = 'news/create';
    $route['news/(:any)'] = 'news/view/$1';
    $route['news'] = 'news';
    $route['(:any)'] = 'pages/view/$1';
    $route['default_controller'] = 'pages/view';

現在打開你的瀏覽器並輸入你的 CodeIgniter 根目錄網址，並在後面加上 index.php/news/create 。 恭喜你，你剛剛建立了你的第一個 CodeIgniter 應用程式！增加一些新聞並逛一逛你所建立的其它頁面。
