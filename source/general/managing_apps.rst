##########################
管理你的應用程式
##########################

預設情況是假設你的 CodeIgniter 只打算用 Codeigniter 管理一個 application，其位在 *application/* 目錄之下。讓多組 application 來共享單一的 CodeIgniter 安裝環境是可行的，也許以更改或是移動 application 目錄至它處亦可。

更改 Application 目錄名稱
==================================

如果想要更改 application 目錄名稱，你也必須要修改 index.php 檔案中的 ``$application_folder`` 變數部份： ::

	$application_folder = 'application';

移動 Application 目錄
=====================================

也可以移動 application 目錄到伺服器的預設的目錄以外的地方。若要這樣的話，請修改 index.php 然後設定 完整伺服器路徑放到 ``$application_folder`` 變數： ::

	$application_folder = '/path/to/your/application';

執行多組 application 共享單一 CodeIgniter 安裝環境
===============================================================

若有意共享單一 CodeIgniter 環境，來管理多組的 applications 的話，只需要把在 application 裡的所有目錄，複製到其他的以目錄底下。

假如，你要新增兩個名為“foo”以及”bar“的 application。你的 application 的目錄結構應該會像這樣： ::

	applications/foo/
	applications/foo/config/
	applications/foo/controllers/
	applications/foo/libraries/
	applications/foo/models/
	applications/foo/views/
	applications/bar/
	applications/bar/config/
	applications/bar/controllers/
	applications/bar/libraries/
	applications/bar/models/
	applications/bar/views/

只要用某個 application 的話，請編輯 index.php 檔案然後設定 ``$application_folder`` 變數。 例如，選用”foo“ application 來用的話，你則需要這麼做： ::

	$application_folder = 'applications/foo';

.. note:: 每個 application 都需要自己的 index.php 檔案， 其負責呼叫自己所需要的 application。這個 index.php 可以隨你開心來改名。
