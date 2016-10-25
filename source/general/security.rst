########
安全性
########

本頁描述一些有關網站安全的”最佳實踐“，同時包含了 CodeIgniter 的內部安全機制細節。

.. note:: 如果你來這邊尋找安全性的聯絡方式，請參考 `Contribution Guide <../contributing/index>`.

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

除了在 ``$_GET`` ， ``$_POST`` ， 以及 ``$_COOKIE`` 陣列中找到的變數，在系統初始化時，所有的整體變數都會 unset 

這個 unsetting 常式效用等同於 *register_globals = off* 選項設定。

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
===================

CodeIgniter 隨附了一個跨站腳本過濾器。這個過濾器會檢視一些在你資料中嵌入惡意 Javascript 的常見技術，還有企圖盜取 Cookie 或是進行其他惡意行為的各種程式碼。跨站腳本（XSS）過濾器在 :doc:`這裡 <../libraries/security>` 有一些說明。

.. note:: XSS filtering should *only be performed on output*. Filtering
	input data may modify the data in undesirable ways, including
	stripping special characters from passwords, which reduces
	security instead of improving it.

資料驗證
========

CSRF stands for Cross-Site Request Forgery, which is the process of an
attacker tricking their victim into unknowingly submitting a request.

CodeIgniter provides CSRF protection out of the box, which will get
automatically triggered for every non-GET HTTP request, but also needs
you to create your submit forms in a certain way. This is explained in
the :doc:`Security Library <../libraries/security>` documentation.

Password handling
=================

It is *critical* that you handle passwords in your application properly.

Unfortunately, many developers don't know how to do that, and the web is
full of outdated or otherwise wrongful advices, which doesn't help.

We would like to give you a list of combined do's and don'ts to help you
with that. Please read below.

-  DO NOT store passwords in plain-text format.

   Always **hash** your passwords.

-  DO NOT use Base64 or similar encoding for storing passwords.

   This is as good as storing them in plain-text. Really. Do **hashing**,
   not *encoding*.

   Encoding, and encryption too, are two-way processes. Passwords are
   secrets that must only be known to their owner, and thus must work
   only in one direction. Hashing does that - there's *no* un-hashing or
   de-hashing, but there is decoding and decryption.

-  DO NOT use weak or broken hashing algorithms like MD5 or SHA1.

   These algorithms are old, proven to be flawed, and not designed for
   password hashing in the first place.

   Also, DON'T invent your own algorithms.

   Only use strong password hashing algorithms like BCrypt, which is used
   in PHP's own `Password Hashing <http://php.net/password>`_ functions.

   Please use them, even if you're not running PHP 5.5+, CodeIgniter
   provides them for you.

-  DO NOT ever display or send a password in plain-text format!

   Even to the password's owner, if you need a "Forgotten password"
   feature, just randomly generate a new, one-time (this is also important)
   password and send that instead.

-  DO NOT put unnecessary limits on your users' passwords.

   If you're using a hashing algorithm other than BCrypt (which has a limit
   of 72 characters), you should set a relatively high limit on password
   lengths in order to mitigate DoS attacks - say, 1024 characters.

   Other than that however, there's no point in forcing a rule that a
   password can only be up to a number of characters, or that it can't
   contain a certain set of special characters.

   Not only does this **reduce** security instead of improving it, but
   there's literally no reason to do it. No technical limitations and
   no (practical) storage constraints apply once you've hashed them, none!

Validate input data
===================

CodeIgniter has a :doc:`Form Validation Library
<../libraries/form_validation>` that assists you in
validating, filtering, and prepping your data.

Even if that doesn't work for your use case however, be sure to always
validate and sanitize all input data. For example, if you expect a numeric
string for an input variable, you can check for that with ``is_numeric()``
or ``ctype_digit()``. Always try to narrow down your checks to a certain
pattern.

Have it in mind that this includes not only ``$_POST`` and ``$_GET``
variables, but also cookies, the user-agent string and basically
*all data that is not created directly by your own code*.

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

避免你的使用者去看到任何潛在允許他們存取敏感檔案，甚至執行代碼，等等。

如果你不想要這樣做，請試著使用 .htaccess 去限制存取這些資源。

CodeIgniter 在所有的資料夾裡面有一個 index.html 檔案去隱藏一些資料，但有它記住，這是不夠的，以防止嚴重的
攻擊者。
