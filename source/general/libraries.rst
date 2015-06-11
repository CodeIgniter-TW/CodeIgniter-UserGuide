###########################
使用 CodeIgniter 函式庫
###########################

所有可用的函式庫置於 system/libraries 目錄之下。大部份情況，其中的類別可透過 :doc:`controller <controllers>` 使用下列函式來啟用::

	$this->load->library('class_name');

其中 'class_name' 為你想取的類別名稱。舉例來說，你可以底下方式來載入 :doc:`Form Validation Library
<../libraries/form_validation>` 類別::

	$this->load->library('form_validation');

只要載入後，你就可以依照教學手冊的相關章節來使用它。

你還可以一次載入多個函式庫，只要傳入一個包含多個函式庫的陣列即可。

例如::

	$this->load->library(array('email', 'table'));

建立自己的函式庫
===========================

請閱讀使用手冊的相關章節來學習如何
:doc:`create your own libraries <creating_libraries>`.
