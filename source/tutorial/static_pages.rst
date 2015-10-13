############
靜態頁面
############

**Note:** 這篇教學假設你已經下載了 CodeIgniter 並且已經 `安裝 <../installation/index.html>`_ 在你的開發環境中。

你要做的第一件事情是設置一個 **控制器（Controller）** 來處理靜態頁面。控制器是一個簡單的類別來幫助委派工作。它是你的網頁應用程式中的膠水。

例如，當瀏覽器發出一個請求給:
``http://example.com/news/latest/10`` 我們可以想像那邊有個控制器名為 "news" 。而 news 控制器將會被呼叫的方法(method)為 "latest" 。 這個 latest 方法的工作可能是抓取十個新聞項目，並顯示在頁面上。這在 MVC 中很常見，你看到的 URL 格式將會是這樣:
``http://example.com/[controller-class]/[controller-method]/[arguments]`` 
當 URL 變得更複雜時這可能會改變。但目前來說這就是我們所需要知道的全部了。

在 application/controllers/Pages.php 創建一個檔案，填入下面的程式::

    <?php 
    class Pages extends CI_Controller { 

        public function view($page = 'home') 
        {
	
        }
		 
    }

你創建了一個類別名為 "pages" ，並且有一個view方法，接受一個參數名為 $page 。這個 pages 類別繼承了 CI_Controller 類別。 代表這個新的 pages 類別可以存取在 CI_Controller 類別（system/core/Controller.php）中定義的方法以及變數。

對你的網頁應用程式而言， **控制器將會成為所有請求的中心** 。用 CodeIgniter 的術語來說，它可以做為超級物件來使用。 就像所有的 php 類別，你在你的控制器中可以使用 $this 來存取它。並且，當你要載入程式庫，載入檢視以及控制 CodeIgniter 時，也是使用 $this 來做。

現在你建立了你的第一個方法，是時候來建立一些基本的頁面模板了。 我們將會建立兩個 "views" （頁面模板）來做為我們頁面的 header 與 footer。

在 application/views/templates/header.php 建立 header 並且加入以下的程式碼::

    <html>
        <head>
            <title>CodeIgniter Tutorial</title>
        </head>
        <body>

            <h1>CodeIgniter Tutorial</h1>

這個 header 放的是你想要在主畫面之前顯示的基本 HTML 代碼，裡面包含了 HTML head。 它也顯示了 $title 變數，我們待會會在控制器中定義它。 現在在 application/views/templates/footer.php 建立 footer 檔案，裡面包含下列代碼:

::

            <em>&copy; 2014</em>
        </body>
    <html>

在控制器（Controller）中增加邏輯
------------------------------

剛才你設置了控制器以及一個 view() 方法。這個方法接受一個參數，這個參數就是將要被讀取的頁面名稱。靜態頁面的模板將會放在 application/views/pages/ 資料夾。

在那個資料夾裡，建立兩個檔案並命名為 home.php 以及 about.php 。在這兩個檔案裡打一些字−隨便你想打什麼−然後存檔。如果你喜歡老套的，就放"Hello World!"。

在讀取這些頁面之前，你必須去確認所要求的頁面是存在的:

::

    <?php 
    public function view($page = 'home')
    {
                
        if ( ! file_exists(APPPATH.'/views/pages/'.$page.'.php'))
        {
            // Whoops, we don't have a page for that!
            show_404();
        }
        
        $data['title'] = ucfirst($page); // Capitalize the first letter
        
        $this->load->view('templates/header', $data);
        $this->load->view('pages/'.$page, $data);
        $this->load->view('templates/footer', $data);

    }

現在，當頁面存在時，它將會被讀取然後顯示給使用者，包含了 header 與 footer 。如果頁面不存在，將會顯示錯誤訊息"404 Page not found"。

在這個方法中的第一行檢查了頁面檔案是否存在。PHP的原生函式 file\_exists() 用來檢查檔案是否在預期的地方。 show\_404() 是 CodeIgniter 內建的函式，用來顯示預設的錯誤訊息頁面。

在 header 模板裡， $title 變數用來客製頁面的標題。在view方法中我們給標題設定了值，但我們不是將值設定給變數，而是設定給 $data 陣列裡面的 title 元素。

最後要做的事情是按照順序來讀取檢視。在 view() 方法中的第二個參數是用來傳值給檢視用的。$data 陣列中的每個值會依照其陣列索引鍵值來存放到同名的變數中。 所以在控制器中 $data['title'] 的值等同於檢視中的 $title 。

路由（Routing）
-------------

控制器現在可以運作了！打開你的瀏覽器並前往 [你的網址]index.php/pages/view 來瞧瞧你的網頁。 當你訪問 index.php/pages/view/about 時你將會看到 about 頁面，並且包含了 header 與 footer。

使用自訂的路由規則，你就擁有將任何 URI 對應到任何控制器與方法的力量，並且掙脫了這個慣例:
``http://example.com/[controller-class]/[controller-method]/[arguments]``

就讓我們試試看。打開位於 application/config/routes.php 的路由檔案，增加下列兩行。並將其它設置 $route 陣列的程式碼都移除。

::

    $route['default_controller'] = 'pages/view';
    $route['(:any)'] = 'pages/view/$1';

CodeIgniter 由上而下讀取這個路由規則，並且將請求導向第一個符合的規則。 每一個規則都是正則表達式（位於左側），對應到由反斜線分隔的控制器與方法（位於右側）。當一個請求進來，CodeIgniter 找出第一個符合的規則，然後呼叫其控制器與方法，可能還包含了參數。

關於路由的更多資訊可以在
`documentation <../general/routing.html>`_ 中找到。

在這邊， $routes 陣列中的第二條規則使用了萬用字串 (:any)，它將會符合任何的請求。並將參數傳送給 pages 類別中的 view() 方法。

現在，訪問 index.php/about 。是不是被正確的導到 pages 控制器中的 view() 方法呢？太神奇了！
