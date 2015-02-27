#####################
Model-View-Controller
#####################

CodeIgniter 是基於 Model-View-Controller 開發的設計模式。 MVC 是軟體開發的方向，它把應用程式的邏輯從 Presentation 中分離出來。實際上，它允許你在網頁上包含最小化的程式碼，因為 Presentation 是從PHP腳本中分離出來的。

-  **Model** 代表你的資料結構。簡單來說你的 model 類別將會包含很多方法，可以幫助你 retrieve、insert、update 資料到你的資料庫。
-  **View** 是網站資訊，它是主要呈現給使用者看的結果。一個 View 一般可以只是 Web Page，但是在 CodeIgniter，View 也可以當成 Page Fragment 像是 header 或是 footer。它也可以做成 RSS Page，或者所有其他形式的 “page”。
-  **Controller** 視為 *中介* 在 Model 和 View 之間，所有 HTTP 請求的資源需求以及處理，或是產出一個網頁都是通過它。

CodeIgniter 有一個相當寬鬆的途徑在 MVC 在架構上，因為 Models 不是必要的。如果你不需要增加分離，或者在維護模式底下你不需要更多複雜的操作，你可以忽略 Model 然後最小化地建置出你的 Application 只用到 Controllers 以及 Views。 CodeIgniter 使你能夠去改善你現存的程式，甚至開發系統核心函式庫，使你在工作上對你自己更有 sense。
