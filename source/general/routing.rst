###########
URI 路由
###########

一般說來，在URL字串與對應的控制器（controller）class/function 之間有著一對一的關係。 通常這些在 URI 中的片段會遵照下列的模式：::

	example.com/class/function/id/

不過在一些實例中，你可能想要重新映射這個關係好讓不同的 class/function 可以被呼叫，而不是原本對應到 URL 的 class/function。

例如，假設你要讓你的 URL 有以下的形式： ::

	example.com/product/1/
	example.com/product/2/
	example.com/product/3/
	example.com/product/4/

正常狀況下，URL的第二片段是保留給函數名稱，但是在上例中，它卻含有 product ID。 為了克服這個狀況，CodeIgniter 允許你重新對應 URL handler。

設定你自己的路由規則
==============================

路由規則定義在你的 *application/config/routes* 。你可以在裡面看到一個叫做 $route 的陣列，它允許你指定你自己的路由標準。路由可以用萬用字元或是正規式來指定。

萬用字元
=========

一個典型的萬用字元路由看起來會像這樣： ::

	$route['product/:num'] = 'catalog/product_lookup';

在一個路由中，陣列的 key 包含了要被匹配的 URI，而陣列值則包含要被重導的目標。 在上例中，如果“product”這個字在 URL 的第一片段，而且第二片段是數字，則轉而使用“catalog”類別以及“product_lookup”方法。

你可以用文字的值或是兩種萬用字元來匹配：

**(:num)** 將匹配只含有數字的一個片段。
**(:any)** 將匹配含有任何字元的一個片段（除了 '/'，這是區段界定符號）。

.. note:: 萬用字元實際上是正規表達式的別名，
	**:any** 被翻譯成 **[^/]+** 以及 **:num** 被翻譯成 **[0-9]+** 。

.. note:: 路由將依照被定義的順序去路由。 較優先的路由總是會優先於較後的路由。

.. note:: 路由規則不是過濾器！設定規則像是 e.g.
	'foo/bar/(:num)' 如果這是一個有效的路徑，不會防止控制器 *Foo* 以及方法 
	*bar* 被非數字的直呼叫。

例子
========

這裡有幾個路由的範例： ::

	$route['journals'] = 'blogs';

一個在第一片段包含“journals”這個字的 URL，將被重新對應到”blogs“類別。
::

	$route['blog/joe'] = 'blogs/users/34';

一個包含“blog/joe”片段的URL，將重新對應到”blogs“類別以及“users”方法。ID 將會設定成”34“。

::

	$route['product/(:any)'] = 'catalog/product_lookup';

一個在第一片段是“product”而在第二片段是任何值的 URL，將重新對應到“catalog”類別以及“product_lookup”方法。

::

	$route['product/(:num)'] = 'catalog/product_lookup_by_id/$1';

一個在第一片段為“product”而第二片段是任何數字的 URL 將重新對應到“catalog”類別以及“product_lookup_by_id”方法，匹配的數字將傳給這個函數作為變數。

.. important:: 不要在開頭/結尾使用斜線。

正規表達式
===================

如果你偏好使用正規表達式來定義路由規則，任何合法的正規式都允許使用，包括 back-reference。

.. note:: 如果使用 back-reference，你必須使用 $ 語法而不是 \\ 語法。

一個典型的正規表達式路由可能看起來像這樣：::

	$route['products/([a-z]+)/(\d+)'] = '$1/id_$2';

在上例中，一個像 products/shirts/123 的 URL 會轉而呼叫“shirts”控制器（Controller）類別及 id_123 函數。

使用正規表達式，你也可以擷取斜線（'/'）中間的片段，這個代表中間多段的分隔符號。

例如，如果使用者想存取你的 Web 應用程式被保護區域的密碼，在登入之後，你希望重導向它們回其他頁面，
你可以參考以下有用的範例： ::

	$route['login/(.+)'] = 'auth/login/$1';

這些對於你不了解正規表達式，並且希望學習更多關於正規表達式，參考 `regular-expressions.info <http://www.regular-expressions.info/>` 可能是一個良好的啟點。

.. note:: 你也可以使用正規表達式時混合以及匹配萬用字元。

回調
=========

如果你是使用版本 PHP >= 5.3 你可以使用回調函數來取代一般的路由規則
來處理 back-references。例子： ::

	$route['products/([a-zA-Z]+)/edit/(\d+)'] = function ($product_type, $id)
	{
		return 'catalog/product_edit/' . strtolower($product_type) . '/' . $id;
	};

路由中使用 HTTP 動詞
==========================

這是有可能的使用 HTTP 動詞（request method）去定義你的路由規則。
這是特別有用的當建立 RESTful 應用程式的時後。你可以使用標準的 HTTP
動詞（GET、PUT、POST、DELETE、PATCH）或者客製化的動詞像是（e.g. PURGE）。HTTP 動詞規則不區分大小寫。所有你需要做的路由，就是將動詞增加到你的陣列索引裡面。

例如： ::

	$route['products']['put'] = 'product/insert';

上述例子，PUT 請求到 URI“products” 稱之為 ``Product::insert()``
控制器方法。

::

	$route['products/(:num)']['DELETE'] = 'product/delete/$1';

DELETE 請求到 URL“products”第一個片段，數字在第二個片段將會重新映射到 ``Product::delete()`` 方法，傳入數值到第一個參數上。

使用 HTTP 動詞當然是可選的（非必要）。

保留的路由
===============

這裏有三個保留的路由： ::

	$route['default_controller'] = 'welcome';

這個路由指定在 URI 裡沒有任何資料時要載入哪個控制器（Controller）類別，人們載入根 URL 時就是這個情況。在上例中，“welcome”類別將被載入。你要儘量有一個預設路由，否則預設會出現一個 404 頁面。

::

	$route['404_override'] = '';

這個路由指定控制器類別應該被載入，如果請求控制器找不到的時候。
它將會複寫 404 錯誤頁面。它將不會影響 ``show_404()`` 函數，這個將會
連續載入預設 *error_404.php* 檔案在
*application/views/errors/error_404.php* 。


::

	$route['translate_uri_dashes'] = FALSE;

很顯然這是布林值，這不是真的路由。
這個選項使你自動地在控制器的方法中 URI 片段將底線替換掉破折號（’-‘），如果你需要做成這樣，從而節省您更多的路由項目。
這是必須的，因為破折號不是有效得類別或者方法名稱字元，如果你使用破折號，會導致重大錯誤。

.. important:: 在任何的萬用字元或者正規表達式路由，保留的路由一定要留著。
