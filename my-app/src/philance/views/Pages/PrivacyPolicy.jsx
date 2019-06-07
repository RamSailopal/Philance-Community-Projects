import React from "react";
import PropTypes from "prop-types";

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import leftImage from "philance/assets/img/left-image.png";
import { List, Container } from "semantic-ui-react"
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import bgImag from "philance/assets/img/VolunteerProject3.jpeg";
import PrivacyPolicyStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
class PrivacyPolicy extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <div
          style={{
            height: "23em",
            marginRight: "-31px",
            marginLeft: "-31px",
            opacity: 1,
            marginBottom: "30px",
            zIndex: 3,
            position: "relative",
            background: "#222222 none repeat scroll 0 0"
          }}
        >
          <img
            className={classes.backImage}
            src={bgImag}
            style={{
              height: "23em",
              width: "100%",
              opacity: "0.6",
              objectFit: "cover"
            }}
          />
          <div>
            <h2>
              <font color="white" face="verdana" className={classes.fontClass1}>
                Privacy Policy
              </font>
            </h2>
          </div>
        </div>

        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem sm={10} md={10} lg={10} >
              <h1 style={{ textAlign: 'center' }} className={classes.dividerTitle1}>Privacy Policy</h1>
              <h3
                className={classes.listDescription}
              >
                PhiLance, Inc. (“PhiLance”, “we”, “our” and “us”) is committed to protecting and respecting your privacy and recognizes that we must maintain and use your information responsibly. This policy (together with our Terms of Use and any other documents referred to in it) sets out the basis on which any personal data we collect from you, or that you provide to us, will be processed by us.
                By continuing to use PhiLance.org (this “Website”), you agree to be legally bound by this Privacy Policy and the Terms of Use (“Terms”, or “Agreement”). These may be modified from time to time. Any changes we may make to our Privacy Policy or Terms of Use in the future will be posted on this Website and, where appropriate, notified to you by e-mail.
              </h3>
            </GridItem>
          </GridContainer>
          <GridContainer justify="center" style={{ marginTop: '50px' }}>
            <GridItem sm={9} md={9} lg={9} >
              <List divided relaxed as='ol' >
                <List.Item as='li' style={{ padding: '1.2em 0' }} >
                  <List.Header as="a" style={{ fontSize: '22px', fontWeight: '400' }}>
                    Information We Collect or You May provide
                </List.Header>
                  <List.Item as='ol'>
                    <List.Item as='li' value='(a)'>
                      <List.Header as="a" style={{ fontSize: '18px', fontWeight: '400' }}>
                        Creating a User Account.
                    </List.Header>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                        You need to create a User Account on this Website in order to post projects, raise funds for those projects, apply to work on projects as a freelancer or a volunteer, update project status, and make donations, although you can make donations even without creating a User Account. When registering for a User Account we require you to provide your first and last names and an email address. Alternatively, you may authorize us to collect your basic personal details from a secure online source (e.g. Google or Facebook), if you register using their authentication service. You can also provide additional information such as your address, phone number, a profile image, favorite impact categories, etc when setting up your user profile on this Website.
                    </List.Description>
                    </List.Item>
                    <List.Item as='li' value='(b)'>
                      <List.Header as="a" style={{ fontSize: '18px', fontWeight: '400' }}>
                        Posting a Project for Crowdfunding.
                    </List.Header>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }} >
                        When you create a project on this Website for
                        fundraising, we collect project related information such as project description,
                        location of project, social impact, budget, resources needed, etc. In addition, in order to receive payments when
                        donors donate to your project, we collect information that is passed on to our payment provider, Stripe, so they
                        can automatically transfer funds into your designated bank account. This includes information such as your business
                        name, business address, Tax ID, telephone number and bank account to which the funds have to be transferred.
                        All of the bank-related information is collected on behalf of Stripe and is stored with Stripe, not with PhiLance.
                    </List.Description>
                    </List.Item>
                    <List.Item as='li' value='(c)'>
                      <List.Header as="a" style={{ fontSize: '18px', fontWeight: '400' }}>
                        Making a Donation.
                    </List.Header>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }} >
                        When you make an online donation on this Website, Stripe,
                        our payment processor, collects information such as your name
                        , billing address, email address and credit card information subject to the Payment Card Industry
                        Data Security Standards as described in the Terms of Use. We also collect information about your donation,
                        including the project you are donating to and the amount of your donation. PhiLance does not store your
                        credit card or bank account information on its servers.
                    </List.Description>

                    </List.Item>
                    <List.Item as='li' value='(d)'>
                      <List.Header as="a" style={{ fontSize: '18px', fontWeight: '400' }}>
                        Applying to work on a Project as a Volunteer or Freelancer.
                    </List.Header>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }} >
                        If you decide to apply to work on a project
                        posted on this Website as a freelancer or
                        volunteer, we require you to create a User Account
                        on this website and provide the necessary information as
                        mentioned above. Payments to freelancers are handled directly by
                        the nonprofit running the project you apply to, so they may
                        collect additional information from you that is needed to
                        fulfil those obligations, including your Tax ID.
                    </List.Description>
                    </List.Item>
                    <List.Item as='li' value='(e)'>
                      <List.Header as="a" style={{ fontSize: '18px', fontWeight: '400' }}>
                        We may obtain information about you from public records.
                    </List.Header>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }} >
                        We may obtain information about you from public
                        records when conducting due diligence on nonprofit
                        organization or conducting fraud prevention checks
                        on donations. We may also collect information about
                        your visits to this Website including, but not limited to,
                        traffic data, location data, weblogs and other communication data,
                        whether this is to predict your preferences and to show you adverts
                        that are most likely to be of interest to you, or required for our
                        own billing purposes or otherwise and the resources that you access.
                        We may also collect information about your computer (and/or mobile device or tablet),
                        including where available your IP address, operating system and browser type,
                        for system administration. This is fully anonymized statistical data about our users'
                        browsing actions and patterns and does not identify any individual.
                    </List.Description>
                    </List.Item>
                  </List.Item>
                </List.Item>

                <List.Item as='li' style={{ padding: '1.2em 0' }} >
                  <List.Header as="a" style={{ fontSize: '22px', fontWeight: '400' }}>
                    Use of Information.
                </List.Header>
                  <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                    PhiLance uses the information that we collect from you for the following purposes.
                </List.Description>
                  <List.Item as='ol'>
                    <List.Item as='li' value='(a)'>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                        To enable you to create a secure User Account on this Website.
                        </List.Description>
                    </List.Item>
                    <List.Item as='li' value='(b)'>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                        To provide you with the services offered on this Website such as posting projects, making donations, applying to work on projects, etc.
                        </List.Description>
                    </List.Item>
                    <List.Item as='li' value='(c)'>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                        To improve the quality of your experience on this Website by customizing your experience.
                        To send you administrative email notifications such as project updates or maintenance updates.
                        </List.Description>
                    </List.Item>
                    <List.Item as='li' value='(d)'>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                        To send you administrative email notifications such as project updates or maintenance updates.
                        </List.Description>
                    </List.Item>
                  </List.Item>
                </List.Item>

                <List.Item as='li' style={{ padding: '1.2em 0' }} >
                  <List.Header as="a" style={{ fontSize: '22px', fontWeight: '400' }}>
                    Disclosure of Personal Data.
                </List.Header>
                  <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                    We may share your data with our agents, representatives, service providers and contractors in order to offer you services in connection with this Website, communicate news and information about PhiLance, provide customer service, notify the project owners you elect to support about your donation, marketing and advertising, and complete financial transactions. We also may disclose your information if required by law, requested by law enforcement authorities or to enforce our legal rights. We may share your information in connection with a sale or reorganization of PhiLance, but in any such case, the terms of this Privacy Policy will continue to apply.
                </List.Description>
                </List.Item>

                <List.Item as='li' style={{ padding: '1.2em 0' }} >
                  <List.Header as="a" style={{ fontSize: '22px', fontWeight: '400' }}>
                    How Long Do We Keep Your Data.
                </List.Header>
                  <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                    We keep your personal data in an identifiable form for as long as we have a legitimate reason to use the data and as required by law.
                </List.Description>
                </List.Item>

                <List.Item as='li' style={{ padding: '1.2em 0' }} >
                  <List.Header as="a" style={{ fontSize: '22px', fontWeight: '400' }}>
                    Children’s Data.
                </List.Header>
                  <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                    This Website does not collect information about a visitor's age. The services of this Website are directed at users who are above the age of 18 or between the ages of 13 and 17 and using this Website with parental or legal guardian consent and supervision.
                </List.Description>
                </List.Item>

                <List.Item as='li' style={{ padding: '1.2em 0' }} >
                  <List.Header as="a" style={{ fontSize: '22px', fontWeight: '400' }}>
                    Links to Other Websites.
                </List.Header>
                  <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                    When you visit other websites whose links appear on this Website, they may collect personal or anonymous data from you. If you provide personal data at one of those sites, you are subject to the privacy policy of that website, not the PhiLance Privacy Policy. We encourage you to read that policy before submitting any personal data.
                </List.Description>
                </List.Item>

                <List.Item as='li' style={{ padding: '1.2em 0' }} >
                  <List.Header as="a" style={{ fontSize: '22px', fontWeight: '400' }}>
                    Your Rights.
                </List.Header>
                  <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                    You are responsible for ensuring that the information you provide to us is accurate, complete and up-to-date. You can review and change your information by logging into this Website and visiting your profile page. You have a number of rights in relation to your personal data:

                </List.Description>
                  <List.Item as='ol'>
                    <List.Item as='li' value='(a)'>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                        You can access, correct, or update your personal data by visiting your profile page on this Website.

                        </List.Description>
                    </List.Item>
                    <List.Item as='li' value='(b)'>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                        You can request deletion of your personal data.

                        </List.Description>
                    </List.Item>
                    <List.Item as='li' value='(c)'>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                        You can object to the processing of your personal data, or ask us to restrict the processing of your personal data.
                        </List.Description>
                    </List.Item>
                    <List.Item as='li' value='(d)'>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                        You can request an archive of your personal data.
                        </List.Description>
                    </List.Item>
                    <List.Item as='li' value='(e)'>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                        You have the right to opt-out of marketing communications.
                        </List.Description>
                    </List.Item>
                    <List.Item as='li' value='(f)'>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                        You have the right to complain to a data protection authority about our use of your personal data. For more information, please contact your local data protection authority. If you have a concern or complaint about the way we handle your data, we ask that you contact us first to allow us to investigate and resolve the matter as appropriate.
                        </List.Description>
                    </List.Item>
                  </List.Item>
                  <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                    We respond to requests from individuals wishing to exercise their data protection rights within 30 days, and do not charge a fee for fulfilling such requests. If you would like to exercise any of your rights or find out more, please contact us at <a style={{ fontWeight: '450' }} href="">support@philance.org.</a>
                  </List.Description>
                </List.Item>

                <List.Item as='li' style={{ padding: '1.2em 0' }} >
                  <List.Header as="a" style={{ fontSize: '22px', fontWeight: '400' }}>
                    Changes to this Privacy Policy.
                </List.Header>
                  <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                    Any changes we may make to our Privacy Policy in the future will be posted on this page and, where appropriate, notified to you by e-mail.
                </List.Description>
                </List.Item>

                <List.Item as='li' style={{ padding: '1.2em 0' }} >
                  <List.Header as="a" style={{ fontSize: '22px', fontWeight: '400' }}>
                    Contact.
                </List.Header>
                  <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                    If you have any questions or concerns in relation to this Website or this Privacy Policy, please contact <a style={{ fontWeight: '450' }} href="">support@philance.org.</a>

                  </List.Description>
                </List.Item>
              </List>
            </GridItem>
          </GridContainer>
          <GridContainer justify="center" style={{ marginTop: '50px' }}>
            <h3 className={classes.dividerTitleModified}>Last Modified: May 2019</h3>
          </GridContainer>

        </div>
      </div>
    );
  }
}

PrivacyPolicy.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(PrivacyPolicyStyle)(PrivacyPolicy);
