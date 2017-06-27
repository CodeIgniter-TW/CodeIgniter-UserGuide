#####################
從 3.0.5 升級到 3.0.6
#####################

在執行升級之前，你應該更換 index.php 為靜態檔案，將網站導向此靜態網頁。

步驟 1：更新網站 CodeIgniter 檔案
=================================

取代 *system/* 目錄打下的所有目錄與檔案

.. 注意:: 假如您有修改此目錄底下的檔案，麻煩請先複製備份。

步驟 2：更新 index.php 檔案 (選擇性的)
=============================================

We've made some tweaks to the index.php file, mostly related to proper
usage of directory separators (i.e. use the ``DIRECTORY_SEPARATOR``
constant instead of a hard coded forward slash "/").

Nothing will break if you skip this step, but if you're running Windows
or just want to be up to date with every change - we do recommend that
you update your index.php file.

*Tip: Just copy the ``ENVIRONMENT``, ``$system_path``, ``$application_folder``
and ``$view_folder`` declarations from the old file and put them into the
new one, replacing the defaults.*

步驟 3：移除 'prep_for_form' 的使用 (強烈建議)
==============================================

The :doc:`Form Validation Library <../libraries/form_validation>` has a
``prep_for_form()`` method, which is/can also be used as a rule in
``set_rules()`` to automatically perform HTML encoding on input data.

Automatically encoding input (instead of output) data is a bad practice in
the first place, and CodeIgniter and PHP itself offer other alternatives
to this method anyway.
For example, :doc:`Form Helper <../helpers/form_helper>` functions will
automatically perform HTML escaping when necessary.

因此， *prep_for_form* 模組/規則 幾乎是沒有用處的，並將於 3.1 之後的版本將其移除。

.. 注意:: 這方法依然可以使用，但我們強烈建議你盡快刪除這方法的使用。
