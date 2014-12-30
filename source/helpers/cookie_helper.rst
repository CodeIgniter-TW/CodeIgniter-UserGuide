#############
Cookie Helper
#############

The Cookie Helper file contains functions that assist in working with
cookies.

.. contents::
  :local:

.. raw:: html

  <div class="custom-index container"></div>

Loading this Helper
===================

This helper is loaded using the following code::

	$this->load->helper('cookie');

Available Functions
===================

The following functions are available:


.. function:: set_cookie($name[, $value = ''[, $expire = ''[, $domain = ''[, $path = '/'[, $prefix = ''[, $secure = FALSE[, $httponly = FALSE]]]]]]]])

	:param	mixed	$name: Cookie name *or* associative array of all of the parameters available to this function
	:param	string	$value: Cookie value
	:param	int	$expire: Number of seconds until expiration
	:param	string	$domain: Cookie domain (usually: .yourdomain.com)
	:param	string	$path: Cookie path
	:param	string	$prefix: Cookie name prefix
	:param	bool	$secure: Whether to only send the cookie through HTTPS
	:param	bool	$httponly: Whether to hide the cookie from JavaScript
	:rtype:	void

	This helper function gives you view file friendly syntax to set browser
	cookies. Refer to the :doc:`Input Library <../libraries/input>` for a
	description of its use, as this function is an alias for
	``CI_Input::set_cookie()``.


.. function:: get_cookie($index[, $xss_clean = NULL]])

	:param	string	$index: Cookie name
	:param	bool	$xss_clean: Whether to apply XSS filtering to the returned value
	:returns:	The cookie value or NULL if not found
	:rtype:	mixed

	This helper function gives you view file friendly syntax to get browser
	cookies. Refer to the :doc:`Input Library <../libraries/input>` for a
	description of its use, as this function is an alias for ``CI_Input::cookie()``.


.. function:: delete_cookie($name[, $domain = ''[, $path = '/'[, $prefix = '']]]])

	:param	string	$name: Cookie name
	:param	string	$domain: Cookie domain (usually: .yourdomain.com)
	:param	string	$path: Cookie path
	:param	string	$prefix: Cookie name prefix
	:rtype:	void

	Lets you delete a cookie. Unless you've set a custom path or other
	values, only the name of the cookie is needed.
	::

		delete_cookie('name');

	This function is otherwise identical to ``set_cookie()``, except that it
	does not have the value and expiration parameters. You can submit an
	array of values in the first parameter or you can set discrete
	parameters.
	::

		delete_cookie($name, $domain, $path, $prefix)