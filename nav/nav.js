function create_menu(basepath)
{
	var base = (basepath == 'null') ? '' : basepath;

	document.write(
		'<table cellpadding="0" cellspaceing="0" border="0" style="width:98%"><tr>' +
		'<td class="td" valign="top">' +

		'<ul>' +
		'<li><a href="'+base+'index.html">使用手冊首頁</a></li>' +	
		'<li><a href="'+base+'toc.html">目錄</a></li>' +
		'</ul>' +	

		'<h3>基本資訊</h3>' +
		'<ul>' +
			'<li><a href="'+base+'general/requirements.html">伺服器需求</a></li>' +
			'<li><a href="'+base+'license.html">許可協議</a></li>' +
			'<li><a href="'+base+'changelog.html">版本紀錄</a></li>' +
			'<li><a href="'+base+'general/credits.html">所有權宣告</a></li>' +
		'</ul>' +	
		
		'<h3>安裝</h3>' +
		'<ul>' +
			'<li><a href="'+base+'installation/downloads.html">下載 CodeIgniter</a></li>' +
			'<li><a href="'+base+'installation/index.html">安裝指引</a></li>' +
			'<li><a href="'+base+'installation/upgrading.html">更新</a></li>' +
			'<li><a href="'+base+'installation/troubleshooting.html">除錯</a></li>' +
		'</ul>' +
		
		'<h3>簡介</h3>' +
		'<ul>' +
			'<li><a href="'+base+'overview/getting_started.html">入門</a></li>' +
			'<li><a href="'+base+'overview/at_a_glance.html">CodeIgniter 匆匆一瞥</a></li>' +
			'<li><a href="'+base+'overview/features.html">支援功能</a></li>' +
			'<li><a href="'+base+'overview/appflow.html">程式流程圖</a></li>' +
			'<li><a href="'+base+'overview/mvc.html">模型-檢視-控制器</a></li>' +
			'<li><a href="'+base+'overview/goals.html">架構目標</a></li>' +
		'</ul>' +	

				
		'</td><td class="td_sep" valign="top">' +

		'<h3>一般主題</h3>' +
		'<ul>' +
			'<li><a href="'+base+'general/urls.html">CodeIgniter URLs</a></li>' +
			'<li><a href="'+base+'general/controllers.html">控制器(控制器(Controllers))</a></li>' +
			'<li><a href="'+base+'general/reserved_names.html">保留字</a></li>' +
			'<li><a href="'+base+'general/views.html">檢視(檢視(Views))</a></li>' +
			'<li><a href="'+base+'general/models.html">模型(模型(Models))</a></li>' +
			'<li><a href="'+base+'general/helpers.html">補助函數(Helpers)</a></li>' +
			'<li><a href="'+base+'general/plugins.html">外掛模組(外掛模組(Plugins))</a></li>' +
			'<li><a href="'+base+'general/libraries.html">使用 CodeIgniter 程式庫</a></li>' +
			'<li><a href="'+base+'general/creating_libraries.html">建立自己的程式庫</a></li>' +
			'<li><a href="'+base+'general/core_classes.html">新增核心類別</a></li>' +
			'<li><a href="'+base+'general/hooks.html">Hooks - Extending the Core</a></li>' +
			'<li><a href="'+base+'general/autoloader.html">自動載入資源</a></li>' +
			'<li><a href="'+base+'general/common_functions.html">通用函數</a></li>' +
			'<li><a href="'+base+'general/scaffolding.html">Scaffolding</a></li>' +
			'<li><a href="'+base+'general/routing.html">URI Routing</a></li>' +
			'<li><a href="'+base+'general/errors.html">錯誤處理</a></li>' +
			'<li><a href="'+base+'general/caching.html">快取</a></li>' +
			'<li><a href="'+base+'general/profiling.html">Profiling Your Application</a></li>' +
			'<li><a href="'+base+'general/managing_apps.html">管理 Applications</a></li>' +
			'<li><a href="'+base+'general/alternative_php.html">變換 PHP 句法</a></li>' +
			'<li><a href="'+base+'general/security.html">安全性</a></li>' +
			'<li><a href="'+base+'general/styleguide.html">PHP 樣式指南</a></li>' +
			'<li><a href="'+base+'doc_style/index.html">撰寫文件</a></li>' +
		'</ul>' +
		
		'</td><td class="td_sep" valign="top">' +

				
		'<h3>類別參考</h3>' +
		'<ul>' +
		'<li><a href="'+base+'libraries/benchmark.html">Benchmarking 類別</a></li>' +
		'<li><a href="'+base+'libraries/calendar.html">Calendaring 類別</a></li>' +
		'<li><a href="'+base+'libraries/config.html">Config 類別</a></li>' +
		'<li><a href="'+base+'database/index.html">Database 類別</a></li>' +
		'<li><a href="'+base+'libraries/email.html">Email 類別</a></li>' +
		'<li><a href="'+base+'libraries/encryption.html">Encryption 類別</a></li>' +
		'<li><a href="'+base+'libraries/file_uploading.html">File Uploading 類別</a></li>' +
		'<li><a href="'+base+'libraries/form_validation.html">Form Validation 類別</a></li>' +
		'<li><a href="'+base+'libraries/ftp.html">FTP 類別</a></li>' +
		'<li><a href="'+base+'libraries/table.html">HTML Table 類別</a></li>' +
		'<li><a href="'+base+'libraries/image_lib.html">Image Manipulation 類別</a></li>' +		
		'<li><a href="'+base+'libraries/input.html">Input and 安全性 類別</a></li>' +
		'<li><a href="'+base+'libraries/loader.html">Loader 類別</a></li>' +
		'<li><a href="'+base+'libraries/language.html">Language 類別</a></li>' +
		'<li><a href="'+base+'libraries/output.html">Output 類別</a></li>' +
		'<li><a href="'+base+'libraries/pagination.html">Pagination 類別</a></li>' +
		'<li><a href="'+base+'libraries/sessions.html">Session 類別</a></li>' +
		'<li><a href="'+base+'libraries/trackback.html">Trackback 類別</a></li>' +
		'<li><a href="'+base+'libraries/parser.html">Template Parser 類別</a></li>' +
		'<li><a href="'+base+'libraries/typography.html">Typography 類別</a></li>' +		
		'<li><a href="'+base+'libraries/unit_testing.html">Unit Testing 類別</a></li>' +
		'<li><a href="'+base+'libraries/uri.html">URI 類別</a></li>' +
		'<li><a href="'+base+'libraries/user_agent.html">User Agent 類別</a></li>' +
		'<li><a href="'+base+'libraries/xmlrpc.html">XML-RPC 類別</a></li>' +
		'<li><a href="'+base+'libraries/zip.html">Zip Encoding 類別</a></li>' +
		'</ul>' +

		'</td><td class="td_sep" valign="top">' +

		'<h3>補助函數參考</h3>' +
		'<ul>' +
		'<li><a href="'+base+'helpers/array_helper.html">Array 補助函數</a></li>' +
		'<li><a href="'+base+'helpers/compatibility_helper.html">Compatibility 補助函數</a></li>' +
		'<li><a href="'+base+'helpers/cookie_helper.html">Cookie 補助函數</a></li>' +
		'<li><a href="'+base+'helpers/date_helper.html">Date 補助函數</a></li>' +
		'<li><a href="'+base+'helpers/directory_helper.html">Directory 補助函數</a></li>' +
		'<li><a href="'+base+'helpers/download_helper.html">Download 補助函數</a></li>' +
		'<li><a href="'+base+'helpers/email_helper.html">Email 補助函數</a></li>' +
		'<li><a href="'+base+'helpers/file_helper.html">File 補助函數</a></li>' +
		'<li><a href="'+base+'helpers/form_helper.html">Form 補助函數</a></li>' +
		'<li><a href="'+base+'helpers/html_helper.html">HTML 補助函數</a></li>' +
		'<li><a href="'+base+'helpers/inflector_helper.html">Inflector 補助函數</a></li>' +
		'<li><a href="'+base+'helpers/language_helper.html">Language 補助函數</a></li>' +
		'<li><a href="'+base+'helpers/number_helper.html">Number 補助函數</a></li>' +
		'<li><a href="'+base+'helpers/path_helper.html">Path 補助函數</a></li>' +
		'<li><a href="'+base+'helpers/security_helper.html">安全性 補助函數</a></li>' +
		'<li><a href="'+base+'helpers/smiley_helper.html">Smiley 補助函數</a></li>' +
		'<li><a href="'+base+'helpers/string_helper.html">String 補助函數</a></li>' +
		'<li><a href="'+base+'helpers/text_helper.html">Text 補助函數</a></li>' +
		'<li><a href="'+base+'helpers/typography_helper.html">Typography 補助函數</a></li>' +
		'<li><a href="'+base+'helpers/url_helper.html">URL 補助函數</a></li>' +
		'<li><a href="'+base+'helpers/xml_helper.html">XML 補助函數</a></li>' +
		'</ul>' +	


		'<h3>更多資源</h3>' +
		'<ul>' +
		'<li><a href="http://codeigniter.com/forums/">社群論壇</a></li>' +
		'<li><a href="http://codeigniter.com/wiki/">社群 Wiki</a></li>' +
		'</ul>' +	
		
		'</td></tr></table>');
}