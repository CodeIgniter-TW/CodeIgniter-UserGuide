#########################
使用 CodeIgniter 驅動器
#########################

驅動器是集合了一個父類別和複數個有關係子類別的特殊程式庫。子類別會使用到父類別的一些功能，但是他們不是父子關係(繼承)。驅動器在各種類別庫得益於或需要分拆成不同類別的情況下，提供在 :doc:`控制器（Controllers） <controllers>` 中能夠以優雅的方式撰寫。

驅動器位於 *system/libraries* 的檔案裡面, 它們會被歸類在與父類別相同名稱的目錄底下，同時所有相關的子類別會存放在一個名為 drivers 附屬檔案中。

當你需要使用驅動器時, 你必須使用以下的函數來進行初式化的動作::

	$this->load->driver('class_name');

上面的 class\_name 是你要調用驅動器的名稱。例如，加載一個名為 "Some Parent" 驅動器的範例如下::

	$this->load->driver('some_parent');

下面示範調用該類別的方法::

	$this->some_parent->some_method();

此外，我們還能夠透過父類別呼叫隸屬於該驅動器的子類別，而無須額外進行初始化::

	$this->some_parent->child_one->some_method();
	$this->some_parent->child_two->another_method();

新增屬於自己的 Drivers
=========================

請先仔細閱讀手冊 :doc:`自建驅動器 <creating_drivers>` 章節。
