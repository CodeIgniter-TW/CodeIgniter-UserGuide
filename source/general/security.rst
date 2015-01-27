########
安全性
########

本頁描述一些有關網站安全的”最佳實踐“，同時包含了 CodeIgniter 的內部安全機制細節。

URI 安全性
============

CodeIgniter 對於哪些字元允許當作 URI 字串有相當嚴格的考量，以盡量減少惡意資料進入應用程式的可能性。URIs 只能包含下列字元：

-  英文大小寫字母與數字（只有拉丁語）
-  波浪號: ~
-  百分比號: %
-  點: .
-  冒號: :
-  底線: \_
-  減號: -
-  空白

Register_globals
=================

除了在 ``$_GET`` ， ``$_POST`` ， 以及 ``$_COOKIE`` 陣列中找到的變數，在系統初始化時，所有的整體變數都會 unset ，這個 unsetting 常式效用等同於 *register_globals = off* 選項設定。

display_errors
==============

在上線產品網站環境中，只要將 *display_errors* 設定為 0 就可以停止所有錯誤輸出。關閉錯誤輸出將會隱藏掉淺在的錯誤資訊。

在 index.php 檔案 設定 CodeIgniter 的 **ENVIRONMENT** 變數值為 **\'production\'** ，系統環境將會關閉錯誤輸出。如果在開發環境之下，建議將 ENVIRONMENT 設定為 'development'，如果想要瞭解更多不同的環境變數值，請參考 :doc:`Handling Environments <environments>` 線上文件。

magic_quotes_runtime
====================

*magic_quotes_runtime* 設定指引會在系統初始化時關閉，所以當你從資料庫取得資料時不必移除反斜線。

**************
最佳實踐
**************

在接受任何資料進入應用程式前，無論是表單提交來的 POST資料、COOKIE資料、URI資料、XML-RPC資料甚至是從SERVER陣列來的資料，我們都鼓勵你盡量實踐以下三步驟的進程：

#. 把資料當作已被污染來過濾。
#. 做好資料驗證以保證它符合正確的型別、長度、大小等。（有時這個步驟可以取代步驟一）
#. 在把資料送進你的資料庫前跳脫（Escape）資料。

CodeIgniter 提供下列的函數來協助你進行這個過程：

跨站腳本（XSS）過濾
=============

CodeIgniter 隨附了一個跨站腳本過濾器。這個過濾器會檢視一些在你資料中嵌入惡意 Javascript 的常見技術，還有企圖盜取 Cookie 或是進行其他惡意行為的各種程式碼。跨站腳本（XSS）過濾器在 :doc:`這裡 <../libraries/security>` 有一些說明。

資料驗證
=================

CodeIgniter 有一個 :doc:`Form Validation Library
<../libraries/form_validation>` 來協助你驗證、過濾及準備你的資料。

在資料存入資料庫前跳脫（Escape）所有資料
=========================================

千萬不要不跳脫(escape)任何資訊就把它存入資料庫。請看一下討論 :doc:`database queries
<../database/queries>` 的章節來獲得更詳細的資訊。

隱藏你的檔案
===============

其它更好的安全實踐只讓你的 *index.php*
以及”assets“（像是 .js，css 以及圖片檔案）放在你的伺服器底下
*webroot* 網站根目錄（大部份一般叫做 "htdocs/"）。
這裡只有想要讓使用者存取的檔案放在這，其餘都不要直接放在網站根目錄底下。

避免你的使用者去看到任何淺在允許他們存取敏感檔案，甚至執行代碼，等等。

如果你不想要這樣做，請試著使用 .htaccess 去限制存取這些資源。

CodeIgniter 在所有的資料夾裡面有一個 index.html 檔案去隱藏一些資料，但有它記住，這是不夠的，以防止嚴重的
攻擊者。
