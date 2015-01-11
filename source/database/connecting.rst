##############
連接您的資料庫
##############

有兩種方法可以連接資料庫：

自動連接
========

"自動連接"就是在每個頁面都載入讀取資料庫類別。
要啟用自動連接，請修改底下檔案，增加 database 字串到 library 陣列裡面：

application/config/autoload.php

手動連接
========

假如只有部份網頁需要用到資料庫連接，您可以增加底下這段程式碼到需要的函式裡面，或者是可以在建構子宣告給該類別全部函式使用。

::

	$this->load->database();

假如上述函式第一個參數 **不包含** 任何資訊，它將會在系統指定的資料庫設定檔中尋找。
對於大多數人來說，這是第一首選方法。

可用參數
--------

#. 資料庫連接設定值，用陣列或者是 DSN 字串表示。
#. TRUE/FALSE (boolean). 是否回傳連線 ID 值（請繼續閱讀底下多重資料庫連接方式）。
#. TRUE/FALSE (boolean). 是否啟用查詢生成器類別. 預設值為 TRUE。

手動連接到一個資料庫
--------------------

第一個參數是可以 **選擇性** 的設定，可以從您的設定檔裡面指定要連接的名稱，或者是您可以自行定義資料庫參數，此設定參數並非在您的設定檔裡面。範例：

從設定檔裡面選擇指定的資料庫，您可以使用下面方式

::

	$this->load->database('group_name');

group_name 指的是您的設定檔裡面所存在的連接資料庫名稱。

要手動連接到需要的資料庫，可以指定底下的參數陣列

::

	$config['hostname'] = 'localhost';
	$config['username'] = 'myusername';
	$config['password'] = 'mypassword';
	$config['database'] = 'mydatabase';
	$config['dbdriver'] = 'mysqli';
	$config['dbprefix'] = '';
	$config['pconnect'] = FALSE;
	$config['db_debug'] = TRUE;
	$config['cache_on'] = FALSE;
	$config['cachedir'] = '';
	$config['char_set'] = 'utf8';
	$config['dbcollat'] = 'utf8_general_ci';
	$this->load->database($config);

想要瞭解每個參數的屬性，可以參考 :doc:`資料庫設定頁面 <configuration>`。

.. 注意:: 當使用 PDO 模式, 你必須使用 $config['dsn'] 設定來取代 "hostname" 和 "database"：
	|
	| $config['dsn'] = 'mysql:host=localhost;dbname=mydatabase';

或者是您可以用 Data Source Name 來連接資料庫。 DSNs 設定方式必需如下：

::

	$dsn = 'dbdriver://username:password@hostname/database';  
	$this->load->database($dsn);

當使用 DSN 字串來連接資料庫時，為了覆蓋系統預設值，可以用查詢字串的方式來增加設定值。

::

	$dsn = 'dbdriver://username:password@hostname/database?char_set=utf8&dbcollat=utf8_general_ci&cache_on=true&cachedir=/path/to/cache';  
	$this->load->database($dsn);

連接多重資料庫
==============

假如想要同時使用多個資料庫，您可以使用底下方式：

::

	$DB1 = $this->load->database('group_one', TRUE); 
	$DB2 = $this->load->database('group_two', TRUE);

注意： 更改上面字串 "group_one" 和 "group_two" 為您所要指定的連接資料庫名稱（或者是您也可以使用如上所述的參數連接值）。

藉由設定第二個參數為 TRUE (boolean) ，此函式將會回傳資料庫物件。

.. 注意:: 當您使用此方法，您將會使用物件名稱來取代本手冊中介紹的方法。
	換句話說，不是使用下面方式：

	|
	| $this->db->query();
	| $this->db->result();
	| etc...
	|
	| You will instead use:
	|
	| $DB1->query();
	| $DB1->result();
	| etc...

.. 注意:: 你不需要建立一個特別的資料庫設定，如果你只是要在一個連線當中使用不同的資料庫。
	當你需要切換到不同的資料庫，你可以這樣做：

	| $this->db->db_select($database2_name);

重新連結 / 保持存活的連線
=========================

如果資料庫伺服器的閒置逾時超過了一些你執行複雜的 php 運算（例如 圖像處理），你應該考慮在進行查詢之前先使用 reconnect() 來偵測伺服器狀態。
他可以持續使用存活的連線或是重新建立他。

::

	$this->db->reconnect();

手動關閉連線
============

當 CodeIgniter 會自動的進行資料庫連線的關閉，你也可以強制關閉連線。

::

	$this->db->close();