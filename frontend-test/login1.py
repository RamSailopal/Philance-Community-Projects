#!/usr/bin/python
# -*- coding: utf-8 -*-
#
#	Tests for current page load on clicking on Login
#	Checks for unauthorised access
#
#
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re

class UntitledTestCase(unittest.TestCase):
    def setUp(self):
        options = webdriver.ChromeOptions()
	options.add_argument('--headless')
	options.add_argument('--disable-gpu')
	options.add_argument('--window-size=1500,1000')
        self.driver = webdriver.Chrome(chrome_options=options)
        self.driver.implicitly_wait(30)
        self.base_url = "https://www.katalon.com/"
        self.verificationErrors = []
        self.accept_next_alert = True
    
    def test_untitled_test_case(self):
        driver = self.driver
        driver.get("http://127.0.0.1:3000")
        driver.find_element_by_xpath("//div[@id='root']/div/header/div/div[2]/ul/li[5]/a/div").click()
        try: self.assertEqual("", driver.find_element_by_id("email").get_attribute("value"))
        except AssertionError as e: self.verificationErrors.append(str(e)) 
        try: self.assertEqual("", driver.find_element_by_id("password").get_attribute("value"))
        except AssertionError as e: self.verificationErrors.append(str(e))
	driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='How It Works'])[1]/following::div[1]").click()
	time.sleep(1)
        driver.find_element_by_id("email").click()
	time.sleep(1)
        driver.find_element_by_id("email").clear()
        driver.find_element_by_id("email").send_keys("tbellow@gmail.com")
        driver.find_element_by_id("password").clear()
        driver.find_element_by_id("password").send_keys("test999")
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Password'])[1]/following::button[1]").click()
	time.sleep(1)
        try: self.assertEqual("INVALID CREDENTIALS", driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Password'])[1]/following::button[1]").text)
        except AssertionError as e: self.verificationErrors.append(str(e))
		
    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException as e: return False
        return True
    
    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException as e: return False
        return True
    
    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally: self.accept_next_alert = True
    
    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()

