<?php
    	$url="http://localhost:3000";
	$handle = curl_init($url);
	curl_setopt($handle,  CURLOPT_RETURNTRANSFER, TRUE);

	$response = curl_exec($handle);

	$httpCode = curl_getinfo($handle, CURLINFO_HTTP_CODE);
	if($httpCode != 200) {
		$fronterr=1;
	}

	curl_close($handle);
	$url="http://localhost:3001";
	$handle = curl_init($url);
	curl_setopt($handle,  CURLOPT_RETURNTRANSFER, TRUE);

	$response = curl_exec($handle);

	$httpCode = curl_getinfo($handle, CURLINFO_HTTP_CODE);
	if($httpCode != 404) {
		$backerr=1;
	}
	echo $fronterr;
	echo $backerr;
	curl_close($handle);
	if ( $backerr == 1 || $fronterr == 1 ) {
		var_dump(http_response_code(502));
	}
	else {
		var_dump(http_response_code(200));
	}
?>
