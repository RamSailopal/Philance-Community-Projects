#!/usr/bin/python
# -*- coding: utf-8 -*-
#
#	Test that the Signup page loads the correct page
#   Test that all the field are validated to ensure that they are all filled in
#   Test that the email address is validated correctly
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
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(30)
        self.base_url = "https://www.katalon.com/"
        self.verificationErrors = []
        self.accept_next_alert = True
    
    def test_untitled_test_case(self):
        driver = self.driver
        driver.get("http://127.0.0.1:3000")
        driver.find_element_by_xpath("//div[@id='root']/div/header/div/div[2]/ul/li[6]/a/div").click()
        try: self.assertEqual("Join Philance and ...", driver.find_element_by_xpath("//div[@id='root']/div/div/div/div/div/div/div/h2").text)
        except AssertionError as e: self.verificationErrors.append(str(e)) 
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::button[1]").click()
	time.sleep(1)
        try: self.assertEqual("ALL FIELDS ARE REQUIRED", driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::button[1]").text)
        except AssertionError as e: self.verificationErrors.append(str(e))
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::input[1]").click()
	time.sleep(1)
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::input[1]").clear()
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::input[1]").send_keys("Bill")
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::button[1]").click()
	time.sleep(1)
        try: self.assertEqual("ALL FIELDS ARE REQUIRED", driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::button[1]").text)
        except AssertionError as e: self.verificationErrors.append(str(e))
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::input[2]").click()
	time.sleep(1)
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::input[2]").clear()
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::input[2]").send_keys("Bains")
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::button[1]").click()
	time.sleep(1)
        try: self.assertEqual("ALL FIELDS ARE REQUIRED", driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::button[1]").text)
        except AssertionError as e: self.verificationErrors.append(str(e))
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::input[3]").click()
	time.sleep(1)
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::input[3]").clear()
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::input[3]").send_keys("bbains@gmail")
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::button[1]").click()
	time.sleep(1)
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::input[4]").click()
	time.sleep(1)
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::input[4]").click()
	time.sleep(1)
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::button[1]").click()
	time.sleep(1)
        try: self.assertEqual("ALL FIELDS ARE REQUIRED", driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::button[1]").text)
        except AssertionError as e: self.verificationErrors.append(str(e))
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::input[4]").click()
	time.sleep(1)
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::input[4]").clear()
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::input[4]").send_keys("tester")
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::button[1]").click()
	time.sleep(1)
        try: self.assertEqual("INVALID EMAIL", driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::button[1]").text)
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

