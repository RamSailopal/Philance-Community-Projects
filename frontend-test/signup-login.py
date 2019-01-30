# -*- coding: utf-8 -*-
#
#	Test the complete signup and login process
#	Checks that private pages load
#
#
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re

class CreateUser(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(30)
        self.base_url = "https://www.katalon.com/"
        self.verificationErrors = []
        self.accept_next_alert = True
    
    def test_create_user(self):
        driver = self.driver
        driver.get("http://127.0.0.1:3000/register")
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Login'])[1]/following::div[1]").click()
	time.sleep(1)
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::input[1]").click()
	time.sleep(1)
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::input[1]").clear()
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::input[1]").send_keys("Joe")
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::input[2]").clear()
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::input[2]").send_keys("Bloggs")
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::input[3]").clear()
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::input[3]").send_keys("jbloggs@gmail.com")
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::input[4]").clear()
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::input[4]").send_keys("test123")
	driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='or with your email'])[1]/following::button[1]").click()
	time.sleep(1)
        driver.find_element_by_id("email").click()
	time.sleep(1)
        driver.find_element_by_id("email").clear()
        driver.find_element_by_id("email").send_keys("jbloggs@gmail.com")
	driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Email...'])[1]/following::div[3]").click()
	time.sleep(1)
        driver.find_element_by_id("password").click()
	time.sleep(1)
        driver.find_element_by_id("password").clear()
        driver.find_element_by_id("password").send_keys("test123")
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Password'])[1]/following::button[1]").click()
	time.sleep(1)
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='User Profile'])[1]/following::h2[1]").click()
	time.sleep(1)
        try: self.assertEqual("Private Home Page", driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='User Profile'])[1]/following::h2[1]").text)
        except AssertionError as e: self.verificationErrors.append(str(e))
	driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Find A project'])[1]/following::div[1]").click()
	time.sleep(1)
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Find A project'])[1]/following::div[1]").click()
	time.sleep(1)
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='User Profile'])[1]/following::h2[1]").click()
	time.sleep(1)
	try: self.assertEqual("My projects Page", driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='User Profile'])[1]/following::h2[1]").text)
        except AssertionError as e: self.verificationErrors.append(str(e))
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='My Projects'])[1]/following::div[1]").click()
	time.sleep(1)
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='User Profile'])[1]/following::h2[1]").click()
	time.sleep(1)
        try: self.assertEqual("Notifications Page", driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='User Profile'])[1]/following::h2[1]").text)
        except AssertionError as e: self.verificationErrors.append(str(e))
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Notifications'])[1]/following::div[1]").click()
	time.sleep(1)
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='User Profile'])[1]/following::h2[1]").click()
	time.sleep(1)
        try: self.assertEqual("Messages Page", driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='User Profile'])[1]/following::h2[1]").text)
        except AssertionError as e: self.verificationErrors.append(str(e))
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Messages'])[1]/following::div[1]").click()
	time.sleep(1)
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='User Profile'])[1]/following::h4[1]").click()
	time.sleep(1)
        try: self.assertEqual("Edit Profile - Complete your profile", driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='User Profile'])[1]/following::h4[1]").text)
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
