# -*- coding: utf-8 -*-
#
#	Tests for current page load on clicking on find a project
#	Checks that all the field work as expected
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
        driver.get("http://127.0.0.1:3000/home")
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Start A Project'])[1]/following::div[1]").click()
	time.sleep(1)
	driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Distance From You'])[1]/following::div[3]").click()
	time.sleep(1)
	try: self.assertEqual("Within 25 miles", driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Within 10 miles'])[1]/following::li[1]").text)
        except AssertionError as e: self.verificationErrors.append(str(e))
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Philance, Inc.'])[1]/following::div[3]").click()
        time.sleep(1)
	driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Skills Needed'])[1]/following::div[3]").click()
        time.sleep(1)
	try: self.assertEqual("IT", driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Choose Skills Needed'])[1]/following::li[1]").text)
        except AssertionError as e: self.verificationErrors.append(str(e))
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Philance, Inc.'])[1]/following::div[3]").click()
	time.sleep(1)
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Impact Category'])[1]/following::div[3]").click()
        time.sleep(1)
	try: self.assertEqual("Elderly", driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Community'])[1]/following::li[1]").text)
        except AssertionError as e: self.verificationErrors.append(str(e))
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Philance, Inc.'])[1]/following::div[3]").click()
	time.sleep(1)
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Resource Type'])[1]/following::div[3]").click()
        time.sleep(1)
	try: self.assertEqual("Needs Volunteers", driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Any'])[4]/following::li[1]").text)
        except AssertionError as e: self.verificationErrors.append(str(e))
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Philance, Inc.'])[1]/following::div[3]").click()
	time.sleep(1)
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Project Status'])[1]/following::div[3]").click()
        time.sleep(1)
	try: self.assertEqual("Closed", driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Active'])[1]/following::li[1]").text)
        except AssertionError as e: self.verificationErrors.append(str(e))
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Philance, Inc.'])[1]/following::div[3]").click()
    
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
