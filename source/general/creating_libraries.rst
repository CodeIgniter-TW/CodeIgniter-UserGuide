##################
建立自己的函式庫
##################

當我們使用 "函式庫(Libraries)" 這個名稱的時候，我們通常指的是位在 libraries 目錄底下的類別，詳細可參考使用手冊中的類別參考的說明。 而在這邊，我們要教你的是如何在 application/libraries 建立你自己的程式庫。這是為了將你的程式庫與 CodeIgniter 內建的區分開來。

CodeIgniter允許你擴展(extend)原有的類別以擴充新功能。你也可以直接取代掉原本的類別，只要你使用與原有類別相同的名稱並放進 *application/libraries 資料夾裡即可。

總結:

-  你可以建立(create)全新的程式庫。
-  You can extend native libraries.
-  You can replace native libraries.

The page below explains these three concepts in detail.

.. note:: The Database classes can not be extended or replaced with your
	own classes. All other classes are able to be replaced/extended.

Storage
=======

Your library classes should be placed within your *application/libraries*
directory, as this is where CodeIgniter will look for them when they are
initialized.

Naming Conventions
==================

-  File names must be capitalized. For example: Myclass.php
-  Class declarations must be capitalized. For example: class Myclass
-  Class names and file names must match.

The Class File
==============

Classes should have this basic prototype::

	<?php
	defined('BASEPATH') OR exit('No direct script access allowed'); 

	class Someclass {

		public function some_method()
		{
		}
	}

	/* End of file Someclass.php */

.. note:: We are using the name Someclass purely as an example.

Using Your Class
================

From within any of your :doc:`Controller <controllers>` methods you
can initialize your class using the standard::

	$this->load->library('someclass');

Where *someclass* is the file name, without the ".php" file extension.
You can submit the file name capitalized or lower case. CodeIgniter
doesn't care.

Once loaded you can access your class using the lower case version::

	$this->someclass->some_method();  // Object instances will always be lower case

Passing Parameters When Initializing Your Class
===============================================

In the library loading method you can dynamically pass data as an
array via the second parameter and it will be passed to your class
constructor::

	$params = array('type' => 'large', 'color' => 'red');

	$this->load->library('someclass', $params);

If you use this feature you must set up your class constructor to expect
data::

	<?php defined('BASEPATH') OR exit('No direct script access allowed');

	class Someclass {

		public function __construct($params)
		{
			// Do something with $params
		}
	}

You can also pass parameters stored in a config file. Simply create a
config file named identically to the class file name and store it in
your *application/config/* directory. Note that if you dynamically pass
parameters as described above, the config file option will not be
available.

Utilizing CodeIgniter Resources within Your Library
===================================================

To access CodeIgniter's native resources within your library use the
``get_instance()`` method. This method returns the CodeIgniter super
object.

Normally from within your controller methods you will call any of the
available CodeIgniter methods using the ``$this`` construct::

	$this->load->helper('url');
	$this->load->library('session');
	$this->config->item('base_url');
	// etc.

``$this``, however, only works directly within your controllers, your
models, or your views. If you would like to use CodeIgniter's classes
from within your own custom classes you can do so as follows:

First, assign the CodeIgniter object to a variable::

	$CI =& get_instance();

Once you've assigned the object to a variable, you'll use that variable
*instead* of ``$this``::

	$CI =& get_instance();

	$CI->load->helper('url');
	$CI->load->library('session');
	$CI->config->item('base_url');
	// etc.

.. note:: You'll notice that the above ``get_instance()`` function is being
	passed by reference::
	
		$CI =& get_instance();

	This is very important. Assigning by reference allows you to use the
	original CodeIgniter object rather than creating a copy of it.

However, since a library is a class, it would be better if you
take full advantage of the OOP principles. So, in order to
be able to use the CodeIgniter super-object in all of the class
methods, you're encouraged to assign it to a property instead::

	class Example_library {

		protected $CI;

		// We'll use a constructor, as you can't directly call a function
		// from a property definition.
		public function __construct()
		{
			// Assign the CodeIgniter super-object
			$this->CI =& get_instance();
		}

		public function foo()
		{
			$this->CI->load->helper('url');
			redirect();
		}

		public function bar()
		{
			echo $this->CI->config->item('base_url');
		}

	}

Replacing Native Libraries with Your Versions
=============================================

Simply by naming your class files identically to a native library will
cause CodeIgniter to use it instead of the native one. To use this
feature you must name the file and the class declaration exactly the
same as the native library. For example, to replace the native Email
library you'll create a file named *application/libraries/Email.php*,
and declare your class with::

	class CI_Email {
	
	}

Note that most native classes are prefixed with CI\_.

To load your library you'll see the standard loading method::

	$this->load->library('email');

.. note:: At this time the Database classes can not be replaced with
	your own versions.

Extending Native Libraries
==========================

If all you need to do is add some functionality to an existing library -
perhaps add a method or two - then it's overkill to replace the entire
library with your version. In this case it's better to simply extend the
class. Extending a class is nearly identical to replacing a class with a
couple exceptions:

-  The class declaration must extend the parent class.
-  Your new class name and filename must be prefixed with MY\_ (this
   item is configurable. See below.).

For example, to extend the native Email class you'll create a file named
*application/libraries/MY_Email.php*, and declare your class with::

	class MY_Email extends CI_Email {

	}

If you need to use a constructor in your class make sure you
extend the parent constructor::

	class MY_Email extends CI_Email {

		public function __construct($config = array())
		{
			parent::__construct($config);
		}

	}

.. note:: Not all of the libraries have the same (or any) parameters
	in their constructor. Take a look at the library that you're
	extending first to see how it should be implemented.

Loading Your Sub-class
----------------------

To load your sub-class you'll use the standard syntax normally used. DO
NOT include your prefix. For example, to load the example above, which
extends the Email class, you will use::

	$this->load->library('email');

Once loaded you will use the class variable as you normally would for
the class you are extending. In the case of the email class all calls
will use::

	$this->email->some_method();

Setting Your Own Prefix
-----------------------

To set your own sub-class prefix, open your
*application/config/config.php* file and look for this item::

	$config['subclass_prefix'] = 'MY_';

Please note that all native CodeIgniter libraries are prefixed with CI\_
so DO NOT use that as your prefix.