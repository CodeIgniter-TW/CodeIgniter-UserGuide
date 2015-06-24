########
日曆類別
########

日曆類別能夠讓你創建日曆。你也可以使用模版將日曆格式化，讓你完全地掌握日曆的設計。
除此之外，你也可以傳送資料到日曆單元格 (calendar cells) 中。


.. contents::
  :local:

.. raw:: html

  <div class="custom-index container"></div>

************
使用日曆類別
************

初始化日曆
==========

如同 CodeIgniter 裡的其他類別，在控制器中初始化日曆類別，是使用 "$this->load->library" 功能::

	$this->load->library('calendar');

當載入之後，日曆物件可以這樣使用::

	$this->calendar

顯示日曆
========

這是一個非常簡單的範例，告訴你如何顯示日曆::

	$this->load->library('calendar');
	echo $this->calendar->generate();

以上的程式碼將會根據你的伺服器時間，建立一個目前年月的日曆。
若要產生一個特定年月的日曆，你需要透過以下方式::

	$this->load->library('calendar');
	echo $this->calendar->generate(2006, 6);

上面的程式碼會建立 2006 年 6 月的日曆。第一個參數代表年份，第二個則代表月份。

傳送資料至日曆單元格 (calendar cells)
=====================================

增加資料到日曆單元格中需要建立一個關聯陣列，在此陣列中對應你想要設定的天數，
包含傳入的值。將此關聯陣列傳送到日曆產生函數的第三個參數。請參考以下範例::

	$this->load->library('calendar');

	$data = array(
		3  => 'http://example.com/news/article/2006/03/',
		7  => 'http://example.com/news/article/2006/07/',
		13 => 'http://example.com/news/article/2006/13/',
		26 => 'http://example.com/news/article/2006/26/'
	);

	echo $this->calendar->generate(2006, 6, $data);

使用以上的範例，日期 3，7，13 以及 26 將會連結到你提供的網址。

.. 註記:: 預設中會假設你的陣列有包含連結。在以下解釋日曆模版的章節中，
          你將會知道如何自行定義資料並傳送至單元格中，藉此你可以傳送不同類型的資訊。

設定顯示偏好
============

有七種偏好設定可以讓你設計日曆。偏好設定是透過傳入關聯陣列的第二個參數。請參考以下範例::

	$prefs = array(
		'start_day'    => 'saturday',
		'month_type'   => 'long',
		'day_type'     => 'short'
	);

	$this->load->library('calendar', $prefs);

	echo $this->calendar->generate();

以上程式碼會將日曆設定為從週六開始，使用 "long" 月份標題，以及 "short" 日期名稱。
更多資訊請參考以下偏好設定。

======================  =================  ============================================  ===================================================================
偏好名稱                預設值             選項                                          描述
======================  =================  ============================================  ===================================================================
**template**           	None               None                                          字串或陣列包含日曆模版。請參考以下模版章節。
											   
**local_time**        	time()             None                                          對應目前的 Unix 時間戳記。
**start_day**           sunday             Any week day (sunday, monday, tuesday, etc.)  設定每周開始的第一天。
**month_type**          long               long, short                                   確定要用什麼月份版本在你的標題。
											   long = January, short = Jan.
**day_type**            abr                long, short, abr                              確定要用什麼星期版本在你的標題欄位。
											   long = Sunday, short = Sun, abr = Su.
**show_next_prev**      FALSE              TRUE/FALSE (boolean)                          顯示上個月/下個月的連結。更多資訊請參考以下章節。
**next_prev_url**       controller/method  A URL                                         設定上個月/下個月的連結基本位置。
**show_other_days**     FALSE              TRUE/FALSE (boolean)                          在同一個月份中，顯示其他月份的月初第一週或月底最後一週。
======================  =================  ============================================  ===================================================================


顯示上個月/下個月的連結
=======================

要讓你的日曆能有上/下個月的連結，你需要設定如下的例子::

	$prefs = array(
		'show_next_prev'  => TRUE,
		'next_prev_url'   => 'http://example.com/index.php/calendar/show/'
	);

	$this->load->library('calendar', $prefs);

	echo $this->calendar->generate($this->uri->segment(3), $this->uri->segment(4));

從上面的例子中，你將會注意到這幾點::

-  你必須設定 "show_next_prev" 為 TRUE。
-  你必須在偏好 "next_prev_url" 中提供 URL，若你沒有這麼做，將會設定成目前的控制器/方法 (controller/method)。
-  你必須透過 URI 字段提供日曆設定含式 "年份" 以及 "月份"。(註記：日曆類別會根據你提供的 URL 自動地加入年份及月份。)

建立日曆模版
============

透過建立日曆模版，你可以 100% 掌控日曆的設計。使用字串的方法，每一個日曆中的組件都將被放置在一對偽變數中，
如以下範例::

	$prefs['template'] = '

		{table_open}<table border="0" cellpadding="0" cellspacing="0">{/table_open}

		{heading_row_start}<tr>{/heading_row_start}

		{heading_previous_cell}<th><a href="{previous_url}">&lt;&lt;</a></th>{/heading_previous_cell}
		{heading_title_cell}<th colspan="{colspan}">{heading}</th>{/heading_title_cell}
		{heading_next_cell}<th><a href="{next_url}">&gt;&gt;</a></th>{/heading_next_cell}

		{heading_row_end}</tr>{/heading_row_end}

		{week_row_start}<tr>{/week_row_start}
		{week_day_cell}<td>{week_day}</td>{/week_day_cell}
		{week_row_end}</tr>{/week_row_end}

		{cal_row_start}<tr>{/cal_row_start}
		{cal_cell_start}<td>{/cal_cell_start}
		{cal_cell_start_today}<td>{/cal_cell_start_today}
		{cal_cell_start_other}<td class="other-month">{/cal_cell_start_other}

		{cal_cell_content}<a href="{content}">{day}</a>{/cal_cell_content}
		{cal_cell_content_today}<div class="highlight"><a href="{content}">{day}</a></div>{/cal_cell_content_today}

		{cal_cell_no_content}{day}{/cal_cell_no_content}
		{cal_cell_no_content_today}<div class="highlight">{day}</div>{/cal_cell_no_content_today}

		{cal_cell_blank}&nbsp;{/cal_cell_blank}

		{cal_cell_other}{day}{cal_cel_other}

		{cal_cell_end}</td>{/cal_cell_end}
		{cal_cell_end_today}</td>{/cal_cell_end_today}
		{cal_cell_end_other}</td>{/cal_cell_end_other}
		{cal_row_end}</tr>{/cal_row_end}

		{table_close}</table>{/table_close}
	';

	$this->load->library('calendar', $prefs);

	echo $this->calendar->generate();

使用陣列的方式，你將會傳送 ``key => value`` 的配對。你可以依照你的意願，傳送更多或更少的值。
省略鍵 (omitted key) 的時候，將會使用預設值取代。

範例::

	$prefs['template'] = array(
		'table_open'           => '<table class="calendar">',
		'cal_cell_start'       => '<td class="day">',
		'cal_cell_start_today' => '<td class="today">'
	);
    
	$this->load->library('calendar', $prefs);
    
	echo $this->calendar->generate();

********
類別參考
********

.. php:class:: CI_Calendar

	.. php:method:: initialize([$config = array()])

		:param	array	$config: 設定的參數
		:returns:	CI_Calendar instance (方法串接)
		:rtype:	CI_Calendar

		初始化日曆的偏好設定。可接受輸入的關聯陣列，包含顯示偏好。

	.. php:method:: generate([$year = ''[, $month = ''[, $data = array()]]])

		:param	int	$year: 年
		:param	int	$month: 月
		:param	array	$data: 要顯示在日曆的單元格的資料
		:returns:	HTML 格式的日曆
		:rtype:	string

		產生日曆。


	.. php:method:: get_month_name($month)

		:param	int	$month: 月
		:returns:	月份名稱
		:rtype:	string

		根據提供的月份數字，產生一個月份名稱。

	.. php:method:: get_day_names($day_type = '')

		:param	string	$day_type: 'long', 'short', 或 'abr'
		:returns:	陣列的日期名稱
		:rtype:	array

		根據提供的日期樣式，回傳一個日期名稱的陣列(如：週日(Sunday)、週一(Monday)...等等)。
		選項：long, short, abr. 若沒有提供 ``$day_type`` 或是提供的樣式無效，
		則會回傳 "abbreviated" 樣式。


	.. php:method:: adjust_date($month, $year)

		:param	int	$month: Month
		:param	int	$year: Year
		:returns:	An associative array containing month and year
		:rtype:	array

		此方法確保你會得到有效的年份/月份。舉例來說，若你提交 13 個月，則年份會往上加，而月份會回到一月::

			print_r($this->calendar->adjust_date(13, 2014));

		outputs::

			Array
			(    
				[month] => '01'
				[year] => '2015'
			)

	.. php:method:: get_total_days($month, $year)

		:param	int	$month: Month
		:param	int	$year: Year
		:returns:	Count of days in the specified month
		:rtype:	int

		取得月份總天數::

			echo $this->calendar->get_total_days(2, 2012);
			// 29

		.. 註記:: 此方式也被稱為 :doc:`Date Helper
			<../helpers/date_helper>` function :php:func:`days_in_month()`.

	.. php:method:: default_template()

		:returns:	An array of template values
		:rtype:	array

		設定預設模版。當你沒有建立你自己的模版，則使用此方法。


	.. php:method:: parse_template()

		:returns:	CI_Calendar instance (method chaining)
		:rtype:	CI_Calendar
		
		取得模版內的數據 ``pseudo-variables``，用在顯示日曆。
		Harvests the data within the template ``{pseudo-variables}`` used to
		display the calendar.
