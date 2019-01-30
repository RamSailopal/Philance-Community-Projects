#!/usr/bin/python
# -*- coding: utf-8 -*-
#
#	Tests for current page load on clicking on How It Works
#	Check for correct actions on page links
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
        driver.find_element_by_xpath("//div[@id='root']/div/header/div/div[2]/ul/li[4]/a/div").click()
	time.sleep(1)
        try: self.assertEqual("How It Works", driver.find_element_by_xpath("//div[@id='root']/div/div/div/div/div/div/div/div/h2").text)
        except AssertionError as e: self.verificationErrors.append(str(e))
        try: self.assertEqual("POST A PROJECT", driver.find_element_by_xpath("//button[@type='button']").text)
        except AssertionError as e: self.verificationErrors.append(str(e)) 
        try: self.assertEqual("WORK ON A PROJECT", driver.find_element_by_xpath("(//button[@type='button'])[2]").text)
        except AssertionError as e: self.verificationErrors.append(str(e))
        driver.find_element_by_xpath("//button[@type='button']").click()
	time.sleep(1)
        driver.find_element_by_xpath("//div[@id='root']/div/div/div/div/div/div/div/div[2]/div/div[2]/div/div/div/div/span/p/ul/li[5]").click()
	time.sleep(1)
        try: self.assertEqual("Start the project and use PhiLance's project management tools to track tasks, milestones, resources and deliverables.", driver.find_element_by_xpath("//div[@id='root']/div/div/div/div/div/div/div/div[2]/div/div[2]/div/div/div/div/span/p/ul/li[5]").text)
        except AssertionError as e: self.verificationErrors.append(str(e))
        driver.find_element_by_xpath("(//button[@type='button'])[2]").click()
	time.sleep(1)
        driver.find_element_by_xpath("//div[@id='root']/div/div/div/div/div/div/div/div[2]/div/div[2]/div/div/div[2]/div/span/p/ul/li[3]").click()
	time.sleep(1)
        try: self.assertEqual("Browse projects using a variety of search criteria such as location, start date, budget, impact area, keywords, etc.", driver.find_element_by_xpath("//div[@id='root']/div/div/div/div/div/div/div/div[2]/div/div[2]/div/div/div[2]/div/span/p/ul/li[3]").text)
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

