##########
資料庫設定
##########

CodeIgniter 提供一個設定檔讓您設定資料庫連線資料(使用者帳號、使用者密碼、資料庫名稱 等…)。
這一個設定檔位於 application/config/database.php。
你也可以藉由位於各別的環境設定目錄當中的 **database.php** 來為該 :doc:`環境 <../libraries/config>` 設定資料庫連線資料。

資料庫設定值是存放在一個遵照以下規範的多維陣列裡面：

::

	$db['default'] = array(
		'dsn'	=> '',
		'hostname' => 'localhost',
		'username' => 'root',
		'password' => '',
		'database' => 'database_name',
		'dbdriver' => 'mysqli',
		'dbprefix' => '',
		'pconnect' => TRUE,
		'db_debug' => TRUE,
		'cache_on' => FALSE,
		'cachedir' => '',
		'char_set' => 'utf8',
		'dbcollat' => 'utf8_general_ci',
		'swap_pre' => '',
		'autoinit' => TRUE,
		'encrypt' => FALSE,
		'compress' => FALSE,
		'stricton' => FALSE,
		'failover' => array()
	);

某些 資料庫drivers (例如 PDO、PostgreSQL、Oracle、ODBC) 可能需要提供完整的 DSN 字串。
在這些案例當中中，你需要使用 'dsn' 設定參數，因為你使用的 driver's 是基於 php 原生 extension，例如：

::

	// PDO
	$db['default']['dsn'] = 'pgsql:host=localhost;port=5432;dbname=database_name';

	// Oracle
	$db['default']['dsn'] = '//localhost/XE';

.. 注意:: 如果你不為這些 driver 指定必須的 DSN 字串，CodeIgniter 將根據所提供的設定來生成他。

.. 注意:: 如果你提供的 DSN 字串缺少了某些必須的設定值(例如：資料庫字符值 等)，這些將造成問題的設定值，CodeIgniter 將會自動添加。

你也可以指定當主要連線因為某些原因不能連現的時候進行失敗接管。
這些失敗接管可以藉由設定 failover 在一個連線上，例如：

::

	$db['default']['failover'] = array(
			array(
				'hostname' => 'localhost1',
				'username' => '',
				'password' => '',
				'database' => '',
				'dbdriver' => 'mysqli',
				'dbprefix' => '',
				'pconnect' => TRUE,
				'db_debug' => TRUE,
				'cache_on' => FALSE,
				'cachedir' => '',
				'char_set' => 'utf8',
				'dbcollat' => 'utf8_general_ci',
				'swap_pre' => '',
				'autoinit' => TRUE,
				'encrypt' => FALSE,
				'compress' => FALSE,
				'stricton' => FALSE
			),
			array(
				'hostname' => 'localhost2',
				'username' => '',
				'password' => '',
				'database' => '',
				'dbdriver' => 'mysqli',
				'dbprefix' => '',
				'pconnect' => TRUE,
				'db_debug' => TRUE,
				'cache_on' => FALSE,
				'cachedir' => '',
				'char_set' => 'utf8',
				'dbcollat' => 'utf8_general_ci',
				'swap_pre' => '',
				'autoinit' => TRUE,
				'encrypt' => FALSE,
				'compress' => FALSE,
				'stricton' => FALSE
			)
		);

你可以指定數個你需要的失敗接管。

我們使用多為陣列儲存的原因是為了讓您可以選擇性設定多組資料庫連接值。
在一個系統底下執行多重環境（開發、正式、測試等），您可以為了每一個開發環境建立獨立的資料庫設定，並且可以任意時候切換資料庫。
舉例，可以設定 "test" 資料庫環境如下：

::

	$db['test'] = array(
		'dsn'	=> '',
		'hostname' => 'localhost',
		'username' => 'root',
		'password' => '',
		'database' => 'database_name',
		'dbdriver' => 'mysqli',
		'dbprefix' => '',
		'pconnect' => TRUE,
		'db_debug' => TRUE,
		'cache_on' => FALSE,
		'cachedir' => '',
		'char_set' => 'utf8',
		'dbcollat' => 'utf8_general_ci',
		'swap_pre' => '',
		'autoinit' => TRUE,
		'compress' => FALSE,
		'encrypt' => FALSE,
		'stricton' => FALSE,
		'failover' => array()
	);

然後，可以告訴系統現在要使用 "test" 連線資料庫，藉由修改設定檔：

::

	$active_group = 'test';

.. 注意:: "test" 這名稱是可以任意修改的。
	他可以是任何你想要的。
	我們預設是使用 "default" 來進行主要連線，但可以根據你的專案來變更這個設定。

查詢生成器
----------

 :doc:`查詢生成器類別 <query_builder>` 是根據資料庫設定檔內 $query_builder 參數來進行全域設定（允許/禁止 TRUE/FALSE (boolean)）。
預設值為 TRUE。
如果你不想使用查詢生成器類別，請將此設定為 FALSE 以便讓系統降低初始化資料庫類別時所需要的資源。

::

	$query_builder = TRUE;

.. 注意:: 一些 CodeIgniter 類別需要啟用查詢生成器來完成一些功能，例如 Sessions

設定值說明：
------------

==============  ==================================================================================================
 設定名稱       說明
==============  ==================================================================================================
**dsn**			DSN 連線字串（所有設定一次完成的設定方式）
**hostname**	您的資料庫伺服器 hostname。通常是本地端 "localhost"。
**username**	用以連線資料庫的使用者名稱。
**password**	用以連線資料庫的使用者密碼。
**database**	你所要連線的資料庫名稱。
**dbdriver**	資料庫類型。例如：mysqli, postgre, odbc 等。 必須使用小寫字母。
**dbprefix**	當使用 :doc: `查詢生成器 <query_builder>` 查詢資料時，將這選用的資料表前綴名稱加入到資料表名稱之前。
				這樣允許讓多個 CodeIgniter 專案共用同一個資料庫。
**pconnect**	TRUE/FALSE (boolean) - 使用保持的連線功能。
**db_debug**	TRUE/FALSE (boolean) - 是否顯示資料庫的錯誤訊息。
**cache_on**	TRUE/FALSE (boolean) - 是否使用資料庫快取功能，詳見 :doc:`資料庫快取類別 <caching>`.
**cachedir**	使用絕對目錄來設定資料庫快取目錄。
**char_set**	與資料庫溝通使用的字符集。
**dbcollat**	與資料庫溝通使用的字符排序。

				.. 注意:: 這只有使用在 "mysql" 和 "mysqli" 類型。

**swap_pre**	用來被 dbprefix 交換的預設的資料表前綴。
				當你可能需要使用手寫的查詢在一個分散式程式設計中是十分有用的，所需要使用的前綴依然可以由終端用戶來決定。
**autoinit**	是否需要在類別被載入的時候自動的進行資料庫連線。
				如果設為 false，連線將會在執行第一個查詢之前進行。
**schema**		資料庫的 schema，預設為 "public"。被 PostgreSQL 和 ODBC 類型使用。
**encrypt**		是否進行加密的連線。
**compress**	是否進行壓縮的客戶端（MySQL 專用）。
**stricton**	TRUE/FALSE (boolean) - 是否使用 "Strict Mode" 連線，使用嚴格的 SQL 對開發中的應用程式是件好事。
**port**		資料庫 port 編號。為了使用本設定你需要於資料庫設定參數陣列當中加入。
				::

				$db['default']['port'] = 5432;
==============  ==================================================================================================

.. 注意:: 並非所有的設定都是需要的，必須根據使用的資料庫 (MySQL，Postgres，etc.) 來決定。
	舉例來說，使用 SQLite 資料庫的時候，就不需要設定使用者帳號跟使用者密碼，只需要設定資料庫所在的路徑位置即可。
	本範例是假設使用 MySQL 資料庫。