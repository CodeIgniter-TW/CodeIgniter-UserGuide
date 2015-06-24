###########
Date 輔助函式
###########

Date 輔助函式包含了各種處理日期的相關函式。

.. contents::
  :local:

.. raw:: html

  <div class="custom-index container"></div>

導入輔助函式
===================

Date 輔助函式的載入語法如下
::

	$this->load->helper('date');

可用函式格式
===================

允許使用的函式格式如下：


.. php:function:: now([$timezone = NULL])

	:param	string	$timezone: 時區
	:returns:	UNIX 時間戳記
	:rtype:	整數

	根據你在 config 檔案中 “time reference“ 的設定，同時參考你伺服器的本地時間或任一 PHP 所支援的時區，並以 UNIX 時間戳記的格式回傳現在的時間，如果你沒有試圖將設定改為 PHP 所支援的任一時區（不過當你在經營一個網站且讓各個使用者可以各別設置時區的話你通常就會做），就沒有必要使用此函式來取代原本 PHP 的 ``time ()`` 了。
	::

		echo now('Australia/Victoria');

	如果沒有提供時區，將會回傳基於 **time_reference** 設定的 ``time ()``。

.. php:function:: mdate([$datestr = ''[, $time = '']])

	:param	string	$datestr: 日期字串
	:param	int	$time: UNIX 時間戳記
	:returns:	MySQL 格式的日期
	:rtype:	字串

	此函式除了可以讓你使用 MySQL 的日期格式（字串中每個字母前方要加上百分比符號，如：`%Y %m %d`）之外，其實跟 PHP 的 `date() <http://php.net/manual/en/function.date.php>`_ 相當雷同。

	使用此函式的好處是你沒必要去過濾任何非日期的字符，其他動作就像你平常使用 ``date()`` 函式一樣。

	範例
	::

		$datestring = 'Year: %Y Month: %m Day: %d - %h:%i %a';
		$time = time();
		echo mdate($datestring, $time);

	如果第二個參數沒有指定時間戳記，將會使用現在的時間。

.. php:function:: standard_date([$fmt = 'DATE_RFC822'[, $time = NULL]])

	:param	string	$fmt: 日期格式
	:param	int	$time: UNIX 時間戳記
	:returns:	已格式化的日期或當格式錯誤時回傳 FALSE
	:rtype:	字串

	回傳你所指定的日期標準格式所產生的日期字串。

	範例
	::

		$format = 'DATE_RFC822';
		$time = time();
		echo standard_date($format, $time);

	.. 提醒:: 此函式將被停用，建議使用內建的 ``date()`` 並搭配 `DateTime's format constants
		<http://php.net/manual/en/class.datetime.php#datetime.constants.types>`_ 來取代之
		::

			echo date(DATE_RFC822, time());

	**支援格式：**

	===============	=======================	======================================
	常量        描述             範例
	===============	=======================	======================================
	DATE_ATOM       Atom                    2005-08-15T16:13:03+0000
	DATE_COOKIE     HTTP Cookies            Sun, 14 Aug 2005 16:13:03 UTC
	DATE_ISO8601    ISO-8601                2005-08-14T16:13:03+00:00
	DATE_RFC822     RFC 822                 Sun, 14 Aug 05 16:13:03 UTC
	DATE_RFC850     RFC 850                 Sunday, 14-Aug-05 16:13:03 UTC
	DATE_RFC1036    RFC 1036                Sunday, 14-Aug-05 16:13:03 UTC
	DATE_RFC1123    RFC 1123                Sun, 14 Aug 2005 16:13:03 UTC
	DATE_RFC2822    RFC 2822                Sun, 14 Aug 2005 16:13:03 +0000
	DATE_RSS        RSS                     Sun, 14 Aug 2005 16:13:03 UTC
	DATE_W3C        W3C                     2005-08-14T16:13:03+0000
	===============	=======================	======================================

.. php:function:: local_to_gmt([$time = ''])

	:param	int	$time: UNIX 時間戳記
	:returns:	UNIX 時間戳記
	:rtype:	int

	輸入 UNIX 時間戳記後將回傳以 GMT 表示的時間。

	範例
	::

		$gmt = local_to_gmt(time());

.. php:function:: gmt_to_local([$time = ''[, $timezone = 'UTC'[, $dst = FALSE]]])

	:param	int	$time: UNIX 時間戳記
	:param	string	$timezone: 時區
	:param	bool	$dst: 是否有啟用 DST
	:returns:	UNIX 時間戳記
	:rtype:	整數

	輸入 UNIX 時間戳記（參考自 GMT）後將其轉化為符合當地時區的時間戳記，並且可選擇計入日光節約時間。 

	範例
	::

		$timestamp = 1140153693;
		$timezone  = 'UM8';
		$daylight_saving = TRUE;
		echo gmt_to_local($timestamp, $timezone, $daylight_saving);


	.. 提醒:: 時區的填寫可參照本頁最下方的表格。

.. php:function:: mysql_to_unix([$time = ''])

	:param	string	$time: MySQL 時間戳記
	:returns:	UNIX 時間戳記
	:rtype:	int

	輸入 MySQL 時間戳記後將回傳 UNIX 時間戳記。

	範例
	::

		$unix = mysql_to_unix('20061124092345');

.. php:function:: unix_to_human([$time = ''[, $seconds = FALSE[, $fmt = 'us']]])

	:param	int	$time: UNIX 時間戳記
	:param	bool	$seconds: 是否顯示秒數
	:param	string	$fmt: 格式（美規或歐規）
	:returns:	已格式化的日期
	:rtype:	字串

	輸入 UNIX 時間戳記後將回傳可清楚識別的時間字串，格式如下：
	::

		YYYY-MM-DD HH:MM:SS AM/PM

	如果你需要在表單欄位中顯示日期的話，這個函式將會相當有用。

	你可以選擇顯示或隱藏秒數，同時可以被設定成歐規或美規，如果只送出時間戳記，預設將會回傳秒數隱藏而且是美規的時間。

	範例
	::

		$now = time();
		echo unix_to_human($now); // 美規時間秒數隱藏
		echo unix_to_human($now, TRUE, 'us'); // 美規時間秒數顯示
		echo unix_to_human($now, TRUE, 'eu'); // 歐規時間秒數顯示

.. php:function:: human_to_unix([$datestr = ''])

	:param	int	$datestr: 日期字串
	:returns:	UNIX 時間戳記或失敗時回傳 FALSE
	:rtype:	整數

	跟 :php:func:`unix_to_time()` 完全相反的函式，輸入人類可識別的時間格式後將回傳 UNIX 時間戳記，假設你需要透過表單讓使用者填寫日期的話，這個函式將會相當有用。 如果使用者輸入的日期格式並非如上一函式所述的話，將會回傳 FALSE。

	範例
	::

		$now = time();
		$human = unix_to_human($now);
		$unix = human_to_unix($human);

.. php:function:: nice_date([$bad_date = ''[, $format = FALSE]])

	:param	int	$bad_date: 格式紊亂的類日期字串
	:param	string	$format: 回傳的日期格式（就像使用 ``date()`` 函式一樣）
	:returns:	已格式化的日期
	:rtype:	字串

	此函式可將一格式紊亂的日期字串轉成至少可以用的格式，當然它也還是接受符合標準格式的啦。

	此函式預設將會回傳 UNIX 時間戳記，並且你可以選擇性地丟出時間格式（就像使用 ``date()`` 函式一樣）當作第二個參數。

	範例
	::

		$bad_date = '199605';
		// Should Produce: 1996-05-01
		$better_date = nice_date($bad_date, 'Y-m-d');

		$bad_date = '9-11-2001';
		// Should Produce: 2001-09-11
		$better_date = nice_date($bad_date, 'Y-m-d');

.. php:function:: timespan([$seconds = 1[, $time = ''[, $units = '']]])

	:param	int	$seconds: 秒數
	:param	string	$time: UNIX 時間戳記
	:param	int	$units: 顯示的時間單位數量
	:returns:	已格式化的不同時間
	:rtype:	字串

	將 UNIX 時間戳記格式化後回傳的值如下
	::

		1 Year, 10 Months, 2 Weeks, 5 Days, 10 Hours, 16 Minutes

	第一個參數必須包含 UNIX 時間戳記，第二個參數包含的時間戳記必須比第一個參數大，第三個參數選填且可以限制顯示的時間單位數量。

	如果第二個參數是空的，將會顯示現在時間。

	最常被用來顯示從過去某個時間點到現在總共經過多久時間。

	範例
	::

		$post_date = '1079621429';
		$now = time();
		$units = 2;
		echo timespan($post_date, $now, $units);

	.. 提醒:: 本函式所回傳的文字可以在此路徑的語言檔案中找到 `language/<your_lang>/date_lang.php`

.. php:function:: days_in_month([$month = 0[, $year = '']])

	:param	int	$month: 數字化的月份
	:param	int	$year: 數字化的年份
	:returns:	在特定月份中的天數
	:rtype:	整數

	輸入年月後回傳該月有幾天，含閏年計算。

	範例
	::

		echo days_in_month(06, 2005);

	如果第二個參數為空，則預設使用今年。

	.. 提醒:: 這個函式是原生的 ``cal_days_in_month()`` 函式的別名，如果它可以使用的話啦。

.. php:function:: date_range([$unix_start = ''[, $mixed = ''[, $is_unix = TRUE[, $format = 'Y-m-d']]]])

	:param	int	$unix_start: 範圍內起始的 UNIX 時間戳記
	:param	int	$mixed: 範圍內結束 UNIX 時間戳記或日期間隔
	:param	bool	$is_unix: 如果 $mixed 不是時間戳記就設為 FALSE
	:param	string	$format: 日期格式就如同在 ``date()`` 用的那樣
	:returns:	日期陣列
	:rtype:	陣列

	回傳在自訂時間內的日期陣列。

	範例
	::

		$range = date_range('2012-01-01', '2012-01-15');
		echo "First 15 days of 2012:";
		foreach ($range as $date)
		{
			echo $date."\n";
		}

.. php:function:: timezones([$tz = ''])

	:param	string	$tz: 時區代號
	:returns:	與 UTC 差距多少小時
	:rtype:	整數

	輸入時區代號（參考最下方列表）後將回傳與 UTC 差距多少小時。

	範例
	::

		echo timezones('UM5');


	很適用於會用到 :php:func:`timezone_menu()` 的時機。

.. php:function:: timezone_menu([$default = 'UTC'[, $class = ''[, $name = 'timezones'[, $attributes = '']]]])

	:param	string	$default: 時區
	:param	string	$class: 下拉選單的 CSS Class name
	:param	string	$name: 下拉選單的 Name
	:param	mixed	$attributes: HTML 屬性
	:returns:	包含時區訊息的 HTML 下拉選單
	:rtype:	字串

	產生一個可以選時區的下拉選單，結果如下：

	.. raw:: html

		<form action="#">
			<select name="timezones">
				<option value='UM12'>(UTC -12:00) Baker/Howland Island</option>
				<option value='UM11'>(UTC -11:00) Samoa Time Zone, Niue</option>
				<option value='UM10'>(UTC -10:00) Hawaii-Aleutian Standard Time, Cook Islands, Tahiti</option>
				<option value='UM95'>(UTC -9:30) Marquesas Islands</option>
				<option value='UM9'>(UTC -9:00) Alaska Standard Time, Gambier Islands</option>
				<option value='UM8'>(UTC -8:00) Pacific Standard Time, Clipperton Island</option>
				<option value='UM7'>(UTC -7:00) Mountain Standard Time</option>
				<option value='UM6'>(UTC -6:00) Central Standard Time</option>
				<option value='UM5'>(UTC -5:00) Eastern Standard Time, Western Caribbean Standard Time</option>
				<option value='UM45'>(UTC -4:30) Venezuelan Standard Time</option>
				<option value='UM4'>(UTC -4:00) Atlantic Standard Time, Eastern Caribbean Standard Time</option>
				<option value='UM35'>(UTC -3:30) Newfoundland Standard Time</option>
				<option value='UM3'>(UTC -3:00) Argentina, Brazil, French Guiana, Uruguay</option>
				<option value='UM2'>(UTC -2:00) South Georgia/South Sandwich Islands</option>
				<option value='UM1'>(UTC -1:00) Azores, Cape Verde Islands</option>
				<option value='UTC' selected='selected'>(UTC) Greenwich Mean Time, Western European Time</option>
				<option value='UP1'>(UTC +1:00) Central European Time, West Africa Time</option>
				<option value='UP2'>(UTC +2:00) Central Africa Time, Eastern European Time, Kaliningrad Time</option>
				<option value='UP3'>(UTC +3:00) Moscow Time, East Africa Time</option>
				<option value='UP35'>(UTC +3:30) Iran Standard Time</option>
				<option value='UP4'>(UTC +4:00) Azerbaijan Standard Time, Samara Time</option>
				<option value='UP45'>(UTC +4:30) Afghanistan</option>
				<option value='UP5'>(UTC +5:00) Pakistan Standard Time, Yekaterinburg Time</option>
				<option value='UP55'>(UTC +5:30) Indian Standard Time, Sri Lanka Time</option>
				<option value='UP575'>(UTC +5:45) Nepal Time</option>
				<option value='UP6'>(UTC +6:00) Bangladesh Standard Time, Bhutan Time, Omsk Time</option>
				<option value='UP65'>(UTC +6:30) Cocos Islands, Myanmar</option>
				<option value='UP7'>(UTC +7:00) Krasnoyarsk Time, Cambodia, Laos, Thailand, Vietnam</option>
				<option value='UP8'>(UTC +8:00) Australian Western Standard Time, Beijing Time, Irkutsk Time</option>
				<option value='UP875'>(UTC +8:45) Australian Central Western Standard Time</option>
				<option value='UP9'>(UTC +9:00) Japan Standard Time, Korea Standard Time, Yakutsk Time</option>
				<option value='UP95'>(UTC +9:30) Australian Central Standard Time</option>
				<option value='UP10'>(UTC +10:00) Australian Eastern Standard Time, Vladivostok Time</option>
				<option value='UP105'>(UTC +10:30) Lord Howe Island</option>
				<option value='UP11'>(UTC +11:00) Srednekolymsk Time, Solomon Islands, Vanuatu</option>
				<option value='UP115'>(UTC +11:30) Norfolk Island</option>
				<option value='UP12'>(UTC +12:00) Fiji, Gilbert Islands, Kamchatka Time, New Zealand Standard Time</option>
				<option value='UP1275'>(UTC +12:45) Chatham Islands Standard Time</option>
				<option value='UP13'>(UTC +13:00) Phoenix Islands Time, Tonga</option>
				<option value='UP14'>(UTC +14:00) Line Islands</option>
			</select>
		</form>


	如果你有個具備會員系統的網站，且允許使用者設置各自的時區，這個下拉選單將會非常好用。

	第一個參數讓你設定預設時區，舉例來說你要設定太平洋時間為預設值的話可以這麼寫：
	::

		echo timezone_menu('UM8');

	當然也請參考下方的時區列表。

	第二個參數讓你設定選單的 CSS Class name。

	第四個參數讓你可以在下拉選單的標籤中額外添加屬性。

	.. 提醒:: 選單中顯示的文字可以在此路徑的語言檔案中找到：`language/<your_lang>/date_lang.php`

Timezone 參考列表
==================

下方的表格包含所有時區以及其相關地點。

提醒一下，列表有些地點為了格式化有稍作修減。

===========     =====================================================================
時區       地點
===========     =====================================================================
UM12            (UTC - 12:00) Baker/Howland Island
UM11            (UTC - 11:00) Samoa Time Zone, Niue
UM10            (UTC - 10:00) Hawaii-Aleutian Standard Time, Cook Islands
UM95            (UTC - 09:30) Marquesas Islands
UM9             (UTC - 09:00) Alaska Standard Time, Gambier Islands
UM8             (UTC - 08:00) Pacific Standard Time, Clipperton Island
UM7             (UTC - 07:00) Mountain Standard Time
UM6             (UTC - 06:00) Central Standard Time
UM5             (UTC - 05:00) Eastern Standard Time, Western Caribbean
UM45            (UTC - 04:30) Venezuelan Standard Time
UM4             (UTC - 04:00) Atlantic Standard Time, Eastern Caribbean
UM35            (UTC - 03:30) Newfoundland Standard Time
UM3             (UTC - 03:00) Argentina, Brazil, French Guiana, Uruguay
UM2             (UTC - 02:00) South Georgia/South Sandwich Islands
UM1             (UTC -1:00) Azores, Cape Verde Islands
UTC             (UTC) Greenwich Mean Time, Western European Time
UP1             (UTC +1:00) Central European Time, West Africa Time
UP2             (UTC +2:00) Central Africa Time, Eastern European Time
UP3             (UTC +3:00) Moscow Time, East Africa Time
UP35            (UTC +3:30) Iran Standard Time
UP4             (UTC +4:00) Azerbaijan Standard Time, Samara Time
UP45            (UTC +4:30) Afghanistan
UP5             (UTC +5:00) Pakistan Standard Time, Yekaterinburg Time
UP55            (UTC +5:30) Indian Standard Time, Sri Lanka Time
UP575           (UTC +5:45) Nepal Time
UP6             (UTC +6:00) Bangladesh Standard Time, Bhutan Time, Omsk Time
UP65            (UTC +6:30) Cocos Islands, Myanmar
UP7             (UTC +7:00) Krasnoyarsk Time, Cambodia, Laos, Thailand, Vietnam
UP8             (UTC +8:00) Australian Western Standard Time, Beijing Time
UP875           (UTC +8:45) Australian Central Western Standard Time
UP9             (UTC +9:00) Japan Standard Time, Korea Standard Time, Yakutsk
UP95            (UTC +9:30) Australian Central Standard Time
UP10            (UTC +10:00) Australian Eastern Standard Time, Vladivostok Time
UP105           (UTC +10:30) Lord Howe Island
UP11            (UTC +11:00) Srednekolymsk Time, Solomon Islands, Vanuatu
UP115           (UTC +11:30) Norfolk Island
UP12            (UTC +12:00) Fiji, Gilbert Islands, Kamchatka, New Zealand
UP1275          (UTC +12:45) Chatham Islands Standard Time
UP13            (UTC +13:00) Phoenix Islands Time, Tonga
UP14            (UTC +14:00) Line Islands
===========	=====================================================================
