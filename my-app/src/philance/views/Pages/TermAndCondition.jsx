import React from "react";
import PropTypes from "prop-types";

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import leftImage from "philance/assets/img/left-image.png";
import { List } from "semantic-ui-react"
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import bgImag from "philance/assets/img/VolunteerProject3.jpeg";
import TermAndConditionStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
class TermAndCondition extends React.Component {
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
                Terms of Use
              </font>
            </h2>
          </div>
        </div>

        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem sm={10} md={10} lg={10} >
              <h1 style={{ textAlign: 'center' }} className={classes.dividerTitle1}>Terms of Use</h1>
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
              <List as='ol' >
                <List.Item as='li' style={{ padding: '1.2em 0' }} >
                  <List.Header as="a" style={{ fontSize: '22px', fontWeight: '400' }}>
                    Acceptance of Terms of Use.
                 </List.Header>
                  <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                    By using this Website as guest or registered user, you indicate that you accept these Terms of Use and that you agree to abide by them. If you do not agree to these Terms of Use, please refrain from using this Website.
                  </List.Description>
                  <List.Item as='ol'>
                    <List.Item as='li' value='(a)'>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                        This Agreement also incorporates the Privacy Policy and all other rules, policies and procedures that may be published from time to time on this Webite each of which may be updated by PhiLance from time to time without notice to you.
                      </List.Description>
                    </List.Item>
                    <List.Item as='li' value='(b)'>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }} >
                        We may revise this Agreement from time to time by updating this page and the revised Terms of Use will take effect when they are posted on this Website. It is your responsibility to check this Agreement periodically for changes. By continuing to use this Website after such changes are posted, you acknowledge and agree to be bound by the Agreement as modified.
                      </List.Description>
                    </List.Item>
                    <List.Item as='li' value='(c)'>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }} >
                        PhiLance reserves the right to modify this Website, and change, suspend, or discontinue providing
                        all or part of the content or functionality of this Website in its sole discretion, with or without notice.
                         You agree that PhiLance shall not be liable to you or to any third party for any such actions.
                    </List.Description>
                    </List.Item>
                    <List.Item as='li' value='(d)'>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }} >
                        If you are an individual accepting this Agreement on behalf of an agency or entity,
                         you warrant that you have the legal right to accept this Agreement on behalf of such
                          agency or entity and that the agency or entity will also be bound by this Agreement.
                      </List.Description>
                    </List.Item>
                    <List.Item as='li' value='(e)'>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }} >
                        You acknowledge and agree that a printed version of this Agreement and/or any
                        electronic communication from PhiLance shall be admissible in judicial or
                        administrative proceedings based upon or relating to this Agreement and/or your
                        use of this Webite to the same extent and subject to the same conditions as other
                        business documents and records originally generated and maintained in printed form.
                    </List.Description>
                    </List.Item>
                  </List.Item>
                </List.Item>

                <List.Item as='li' style={{ padding: '1.2em 0' }} >
                  <List.Header as="a" style={{ fontSize: '22px', fontWeight: '400' }}>
                    Eligibility.
                </List.Header>
                  <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                    In using the site, you represent and warrant that:
                  </List.Description>
                  <List.Item as='ol'>
                    <List.Item as='li' value='(a)'>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                        You are 18 years or older or between the ages of 13 and 17 and using the Website with parental or legal guardian consent and supervision.
                      </List.Description>
                    </List.Item>
                    <List.Item as='li' value='(b)'>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                        Your membership or use has not otherwise been restricted, suspended or terminated.
                      </List.Description>
                    </List.Item>
                    <List.Item as='li' value='(c)'>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                        You are not using another Member’s account without her/his permission.

                        </List.Description>
                    </List.Item>
                    <List.Item as='li' value='(d)'>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                        You are legally capable of entering into binding contracts.

                        </List.Description>
                    </List.Item>
                  </List.Item>
                </List.Item>

                <List.Item as='li' style={{ padding: '1.2em 0' }} >
                  <List.Header as="a" style={{ fontSize: '22px', fontWeight: '400' }}>
                    Personal Information.
                </List.Header>
                  <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                    We process information about you in accordance with our Privacy Policy. By using our site, you consent to such processing and you warrant that all data provided by you is accurate.
                </List.Description>
                </List.Item>

                <List.Item as='li' style={{ padding: '1.2em 0' }} >
                  <List.Header as="a" style={{ fontSize: '22px', fontWeight: '400' }}>
                    Registration.
                </List.Header>
                  <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                    You may browse this Website without registering, but as a condition
                    to using certain aspects of the Website, you may be required to register (create a User Account on this Website) and select a password. In doing so, you acknowledge and agree that:
                </List.Description>
                  <List.Item as='ol'>
                    <List.Item as='li' value='(a)'>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                        The information you provide is accurate and complete and you will maintain, update, and correct such information regularly.
                        If we believe you have provided false information, we reserve the right to terminate your User Account.
                      </List.Description>
                    </List.Item>
                    <List.Item as='li' value='(b)'>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                        You are exclusively responsible for the security and confidentiality of your User Account on this Website and for all use of this Website that occurs in connection with your User Account, with or without your knowledge.
                        </List.Description>
                    </List.Item>
                    <List.Item as='li' value='(c)'>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                        PhiLance does not guarantee the identity of registered users on this Website. If you arrange any meetings with any person through the use of this Website, then you do so at your own risk.
                      </List.Description>
                    </List.Item>
                  </List.Item>

                </List.Item>

                <List.Item as='li' style={{ padding: '1.2em 0' }} >
                  <List.Header as="a" style={{ fontSize: '22px', fontWeight: '400' }}>
                    Acceptable Use Policy.
                  </List.Header>
                  <List.Item as='ol'>
                    <List.Item as='li' value='(a)'>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                        You may only use this Website for lawful purposes. You may not use the Website in any way that breaches any applicable local, national or international law or regulation.
                      </List.Description>
                    </List.Item>
                    <List.Item as='li' value='(b)'>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                        You may not post, transmit, distribute, publish, use, or otherwise make available, through or in connection with this Website:
                      </List.Description>

                      <List bulleted>
                        <List.Item >
                          <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                            Anything that is or may be (a) threatening, intimidating, degrading, hateful, or harassing; (b) defamatory; (c) fraudulent; (d) indecent, pornographic, obscene, offensive, or otherwise objectionable, in all cases as determined by PhiLance in its sole discretion;

                          </List.Description>
                        </List.Item>
                        <List.Item >
                          <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                            Anything that is protected by copyright, trademark, trade secret, right of publicity, moral rights, or other proprietary right without authorization from the rights-owner;
                          </List.Description>
                        </List.Item>
                        <List.Item >
                          <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                            Any unsolicited or unauthorized advertising or promotional material or any junk mail, spam or chain letters;
                          </List.Description>
                        </List.Item>
                        <List.Item>
                          <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                            Any virus, worm, Trojan horse, Easter egg, time bomb, spyware, or other computer code, file, or program that may: (a) Invade, harm, disrupt or hijack the operation of this Website; (b) mislead or harm any third party; (c) monitor access to or use of this Website by others;
                            </List.Description>
                        </List.Item>
                      </List>
                    </List.Item>
                    <List.Item as='li' value='(c)'>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                        You agree that:
                      </List.Description>
                      <List bulleted>
                        <List.Item >
                          <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                            You will not interfere with or disrupt the operation of this Website or any servers, hardware, or software used in connection with the Website;


                          </List.Description>
                        </List.Item>
                        <List.Item >
                          <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                            You will not collect or store personal data about other users of the Site other than in accordance with the Privacy Policy;

                          </List.Description>
                        </List.Item>
                        <List.Item >
                          <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                            You will not use or attempt to use this Website for any unlawful, criminal, or negligent purposes (includes password cracking, social engineering, denial-of-service attacks, harmful and malicious destruction of data, and intentional invasion of privacy).

                          </List.Description>
                        </List.Item>
                        <List.Item >
                          <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                            You will not use any part of this Website which you are not authorized to use or devise ways to circumvent security in order to access part of this Website which you are not authorized to access (includes scanning networks with intent to breach and/or evaluate security)
                          </List.Description>
                        </List.Item>
                        <List.Item >
                          <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                            You will not, without our express written consent, reproduce, duplicate, copy, sell, or resell any element of this Website, including any information or materials made available on or through the Website;

                          </List.Description>
                        </List.Item>
                        <List.Item >
                          <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                            You will not, without our express written consent, use any robot, spider, site search/retrieval application or other manual or automatic device to retrieve, index, "scrape," "data mine," "harvest" or in any way gather this Website content.
                          </List.Description>
                        </List.Item>
                      </List>
                    </List.Item>
                    <List.Item as='li' value='(d)'>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                        We will determine, in our discretion,
                        whether there has been a breach of this acceptable use policy through your use of this Website.
                        If we deem a breach has occurred, we may take such action as we deem appropriate including suspension or termination of your User Account and deletion of any content generated, provided, uploaded or otherwise made accessible on or through this Website by you.
                        Failure to comply with this acceptable use policy constitutes a material breach of the Terms of Use subject to which you are permitted to use this Website.
                      </List.Description>
                    </List.Item>
                  </List.Item>

                </List.Item>

                <List.Item as='li' style={{ padding: '1.2em 0' }} >
                  <List.Header as="a" style={{ fontSize: '22px', fontWeight: '400' }}>
                    Website Content, License and Monitoring.
                  </List.Header>
                  <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                    As a registered user of this Website, you may post information (your “Content”) on this Website including videos, audio clips, images, data, text, photographs, graphics, interactive features, and other content. You acknowledge and agree that:
                  </List.Description>
                  <List.Item as='ol'>
                    <List.Item as='li' value='(a)'>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                        Your Content will not contain third-party copyrighted material, or material that is subject to other third-party proprietary rights, unless you have permission from the rightful owner of the material or you are otherwise legally entitled to post the material and to grant PhiLance all of the license rights granted herein.
                      </List.Description>
                    </List.Item>
                    <List.Item as='li' value='(b)'>
                      <List.Header as="a" style={{ fontSize: '18px', fontWeight: '400' }}>
                        Content License:
                    </List.Header>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                        By submitting your Content on this Website, you hereby do and shall grant, and you represent and warrant that you have the right to grant, PhiLance a perpetual, irrevocable, worldwide, royalty-free and non-exclusive license to use, modify, reproduce, publish, broadcast, prepare derivative works of, display and distribute your Content in any format, using any medium,
                       for the purpose of promoting PhiLance or for any other purpose that we deem appropriate.
                      </List.Description>
                    </List.Item>
                    <List.Item as='li' value='(c)'>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                        You agree to pay all royalties and other amounts owed to any person or
                        entity due to your submission of your Content on this Website or
                        PhiLance’s exercise of the Content License above.
                      </List.Description>
                    </List.Item>
                    <List.Item as='li' value='(d)'>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                        PhiLance will not be liable for any errors or omissions in your Content.

                        </List.Description>
                    </List.Item>
                    <List.Item as='li' value='(e)'>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                        PhiLance may, in its sole discretion,
                         but has no obligation to, monitor, alter,
                         remove, or disclose to a third party Content posted by you or any other registered user
                        (user-provided Content) on this Website. Without limiting the foregoing, you acknowledge
                        and agree that PhiLance is not responsible for screening, policing, editing or monitoring user-provided Content.
                        If notified of allegedly false, infringing, defamatory, damaging, illegal or offensive conduct, PhiLance may investigate the allegation and determine, in its sole discretion, whether to remove or request the removal of such user-provided Content from this Website. PhiLance shall not assume any liability for user-provided Content or third party conduct, communication or information on this Website. You acknowledge that all user-provided Content accessed by you when using this Website is at your own risk and you will be solely responsible for any damage or loss to any party resulting therefrom.
                      </List.Description>
                    </List.Item>
                  </List.Item>
                </List.Item>

                <List.Item as='li' style={{ padding: '1.2em 0' }} >
                  <List.Header as="a" style={{ fontSize: '22px', fontWeight: '400' }}>
                    Donations, Payments, Fees and Refunds.
                  </List.Header>
                  <List.Item as='ol'>
                    <List.Item as='li' value='(a)'>
                      <List.Header as="a" style={{ fontSize: '18px', fontWeight: '400' }}>
                        Donations.
                      </List.Header>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                        This Website is a platform for crowdfunding community projects posted by nonprofits. You do not need to be a registered user of this Website in order to make a donation to a project posted on this Website. Donations, minus any fees, are transferred to the nonprofit posting the project immediately regardless of whether the fundraising target has been reached or not. This allows the nonprofit to get started on the project as soon as some funds become available and it does not have to wait until the fundraising target is reached. Making a contribution to a project does not give the donor any rights in or to that project, including any ownership, control, or distribution rights, and the project creator is free to solicit other funding for the project, enter into contracts for the project, allocate rights in or to the project, and otherwise direct the project at its sole discretion. Project creators are wholly responsible for fulfilling the stated and implied obligations in any project listing they create on this Website. PhiLance cannot be held liable for the actions of the project creators and does not bear any responsibility or liability should the project not be completed. PhiLance does not warrant how donations to a project listing on this Website will be used by the nonprofit that created that listing and PhiLance shall not be held responsible for any dissatisfaction a donor may have regarding a nonprofit's use, misuse or non-use of their donation collected through this Website. By making a donation you warrant and represent that you are the cardholder, or have the express permission of the cardholder, and that you are not acting in a fraudulent, unlawful or abusive manner.
                      </List.Description>
                    </List.Item>
                    <List.Item as='li' value='(b)'>
                      <List.Header as="a" style={{ fontSize: '18px', fontWeight: '400' }}>
                        Payment Service Provider.
                      </List.Header>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>

                        PhiLance uses Stripe (https://stripe.com/) as its payment service provider and Stripe charges a fee for its services (for details of the fee please see {"<link to pricing page>"}) that is deducted from the donation before it is transferred to the nonprofit receiving that donation. Collection of donations, handling of credit card transactions and payments to nonprofits are all managed securely, and in a PCI compliant manner, through services provided by Stripe. PhiLance does not store any credit card information on its own servers. Once the donor's credit or debit card provider approves the transaction, Stripe arranges the transfer of funds to the selected nonprofit in accordance with its terms and practices and the donor receives an email confirmation. If the donation is meant for a registered US 501(c)(3) organization, that organization will communicate directly with the donor regarding tax exemptions for the donation. PhiLance makes no guarantees regarding the performance or Stripe.

                        </List.Description>
                    </List.Item>
                    <List.Item as='li' value='(c)'>
                      <List.Header as="a" style={{ fontSize: '18px', fontWeight: '400' }}>
                        Fees.
                      </List.Header>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                        For information about our fees please see{" <link to pricing page>"}
                      </List.Description>
                    </List.Item>
                    <List.Item as='li' value='(d)'>
                      <List.Header as="a" style={{ fontSize: '18px', fontWeight: '400' }}>
                        Refunds.
                      </List.Header>
                      <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                        Donations will not be refunded for any reason, subject to applicable local laws. If we are unable to transfer the funds to the nonprofit to which you donated, we will return your donation via the payment method from which you made the donation.  If we are unable to return your donation via the payment method you used, your donation will be sent to another nonprofit of PhiLance's choosing, subject to the deduction of applicable transaction and payment processing fees. If donors wish to make a refund request they will need to contact the nonprofit receiving that donation directly. Nonprofits may initiate refunds at their own discretion. PhiLance is not responsible for issuing refunds for funds that have been collected by the nonprofits. When you make a donation, the transaction is final and not disputable unless unauthorized use of your credit/debit card is proven. If you become aware of fraudulent use of your card you must notify your card provider in accordance with their rules.
                      </List.Description>
                    </List.Item>
                  </List.Item>

                </List.Item>

                <List.Item as='li' style={{ padding: '1.2em 0' }} >
                  <List.Header as="a" style={{ fontSize: '22px', fontWeight: '400' }}>
                    Freelancing and Volunteering.
                </List.Header>
                  <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                    For those who apply to work on projects listed on this Website as a freelancer or volunteer, you will be put in touch with the nonprofit running that project, and they will handle all matters related to your work on the project, including your work schedule, salary (for freelancers), payments (for freelancers), tax-related information and work requirements. PhiLance will not be involved in any discussions between the nonprofit running the project and the freelancers or volunteers working on that project. Nor will PhiLance be liable for any situations that arise between the freelancer or volunteer and the nonprofit. PhiLance does not warrant the suitability of any person applying to work on a project. It is up to the nonprofit to determine fit of any applicant for their project and make an independent decision of whether to accept that person as a freelancer or volunteer on that project or not. Nor does PhiLance provide any warranties about the nature of work on any given project. It is entirely the responsibility of the person applying as a volunteer or freelancer to determine suitability of the project for their needs and to negotiate all requirements directly with the nonprofit running the project. PhiLance cannot be held liable for any disagreements that may arise between nonprofits running projects and volunteers or freelancers who apply to work on those projects through this Website. This Website is simply a means to introduce the parties to one another, and all further dealings are directly between the nonprofits and the freelancers or volunteers at their own risk.
                </List.Description>
                </List.Item>

                <List.Item as='li' style={{ padding: '1.2em 0' }} >
                  <List.Header as="a" style={{ fontSize: '22px', fontWeight: '400' }}>
                    Links.
                </List.Header>
                  <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                    This Website contains links to other websites, posted by PhiLance, its registered users or third parties. Inclusion of a link to another website does not imply endorsement of its content or opinions and PhiLance is not responsible for the accuracy, reliability, quality, or legality of any such content or opinions. Your relationship and any direct transactions with other people or organizations are your own responsibility.
                  </List.Description>
                </List.Item>

                <List.Item as='li' style={{ padding: '1.2em 0' }} >
                  <List.Header as="a" style={{ fontSize: '22px', fontWeight: '400' }}>
                    Copyright.
                </List.Header>
                  <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                    All content on this Website and its associated services is owned by PhiLance, its registered users or other original providers, and is protected by the applicable intellectual property and proprietary rights and laws. You may copy content for your own personal, non-commercial use provided you do not alter it or remove any copyright, trade mark or other proprietary notice, and that your usage complies with any requests you may receive from any person with rights in that content. No other use of this Website's and its associated services' content is permitted without the express prior permission of PhiLance, and, where applicable, the copyright holder.
                  </List.Description>
                </List.Item>

                <List.Item as='li' style={{ padding: '1.2em 0' }} >
                  <List.Header as="a" style={{ fontSize: '22px', fontWeight: '400' }}>
                    Termination.
                </List.Header>
                  <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                    This Agreement is effective until terminated. You may discontinue use of this Website and associated services at any time. PhiLance reserves the right, at its sole discretion, to immediately and without notice suspend or permanently deny your access to all or part of this Website and associated services, at any time and for any reason, including violation of these Terms of Use. These Terms of Use will continue to apply to your past use.
                  </List.Description>
                </List.Item>

                <List.Item as='li' style={{ padding: '1.2em 0' }} >
                  <List.Header as="a" style={{ fontSize: '22px', fontWeight: '400' }}>
                    Disclaimer and Limitation of Liability.
                </List.Header>
                  <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                    You agree that your use of this Website and its associated services is on an "as is" and "as available" basis and that your use of this Website and its associated services is at your sole risk, including without limitation, any reliance on the accuracy, timeliness, availability, security, completeness or usefulness of any content or services available on or through this Website or on or through any link available on this Website. PhiLance disclaims all warranties with respect to this Website and its associates services; projects or other opportunities for giving available on or through this Website; the use of donation funds pledged or promised through this Website; and any content or services available on or through this Website to the fullest extent permissible by law, including the warranties of Merchantability, Fitness for a particular purpose, Non-infringement and Title.
                  </List.Description>
                  <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em', textTransform: "uppercase", }}>
                    PHILANCE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, EXEMPLARY OR PUNITIVE DAMAGES OF ANY KIND, UNDER ANY CONTRACT, NEGLIGENCE, STRICT LIABILITY OR OTHER THEORY (INCLUDING DETRIMENTAL RELIANCE), INCLUDING WITHOUT LIMITATION, DAMAGES FOR LOSS OF PROFITS, USE, DATA, LOSS OF INTELLECTUAL PROPERTY, LOSS OF OTHER INTANGIBLES, LOSS OF SECURITY OF INFORMATION IN CONNECTION WITH YOUR USE OR ANY OTHER PARTY'S USE OR MISUSE OF THIS WEBSITE, EVEN IF ADVISED IN ADVANCE OF SUCH DAMAGES OR LOSSES. YOUR SOLE AND EXCLUSIVE REMEDY FOR DISSATISFACTION WITH THIS WEBSITE IS TO STOP USING THIS WEBSITE. THE MAXIMUM LIABILITY OF PHILANCE FOR ALL DAMAGES, LOSSES AND CAUSES OF ACTION, WHETHER IN CONTRACT, TORT (INCLUDING WITHOUT LIMITATION NEGLIGENCE) OR OTHERWISE, SHALL BE $100 (ONE HUNDRED US DOLLARS). YOU EXPRESSLY AGREE TO THE ALLOCATION OF RISK SET FORTH HEREIN.
                  </List.Description>
                </List.Item>

                <List.Item as='li' style={{ padding: '1.2em 0' }} >
                  <List.Header as="a" style={{ fontSize: '22px', fontWeight: '400' }}>
                    Indemnity.
                </List.Header>
                  <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                    You agree to defend, indemnify and hold harmless PhiLance and its respective successors, sponsors, employees, officers, directors, shareholders, affiliates, agents, representatives, suppliers and members, from and against all claims, losses, costs and expenses (including attorneys fees) arising out of (a) your use of, or activities in connection with, this Website; (b) any violation of this Agreement by you or anyone using your User Account; (c) your violation of any rights of any other person or entity while using this Website; or (d) information that you or anyone with your password submits, posts, or transmits through this Website.
                  </List.Description>
                </List.Item>

                <List.Item as='li' style={{ padding: '1.2em 0' }} >
                  <List.Header as="a" style={{ fontSize: '22px', fontWeight: '400' }}>
                    Governing Law and Jurisdiction.
                </List.Header>
                  <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                    These Terms of Use and any dispute arising out of or in connection with your use of this Website or the associated services are governed by and shall be construed in accordance with the laws of the State of Massachusetts. You agree to exclusive jurisdiction by the federal and state courts located in the State of Massachusetts, and waive any jurisdictional, venue or inconvenient forum objections to such courts. Notwithstanding this, you agree that PhiLance may apply for injunctive remedies (or an equivalent type of urgent legal relief) in any jurisdiction.
                  </List.Description>
                </List.Item>

                <List.Item as='li' style={{ padding: '1.2em 0' }} >
                  <List.Header as="a" style={{ fontSize: '22px', fontWeight: '400' }}>
                    Claims of Copyright Infringement.
                </List.Header>
                  <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                    The Digital Millennium Copyright Act of 1998 (the "DMCA") provides recourse for copyright owners who believe that material appearing on the Internet infringes their rights under U.S. copyright law. If you believe in good faith that materials available on this Website infringe your copyright, you (or your agent) may send PhiLance a notice requesting that we remove the material or block access to it. If you believe, in good faith, that someone has wrongly filed a notice of copyright infringement against you, the DMCA permits you to send PhiLance a counter-notice. Notices and counter-notices must meet the then-current statutory requirements imposed by the DMCA. See http://www.copyright.gov/ for details. Notices and counter-notices should be sent by email to support@Philance.org.

                  </List.Description>
                </List.Item>

                <List.Item as='li' style={{ padding: '1.2em 0' }} >
                  <List.Header as="a" style={{ fontSize: '22px', fontWeight: '400' }}>
                    Contact Us.
                </List.Header>
                  <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                    If you have any questions or concerns in relation to this Website or these Terms of Use, please contact support@philance.org.

                  </List.Description>
                </List.Item>

                <List.Item as='li' style={{ padding: '1.2em 0' }} >
                  <List.Header as="a" style={{ fontSize: '22px', fontWeight: '400' }}>
                    Miscellaneous.
                </List.Header>
                  <List.Description className={classes.listDescription} style={{ lineHeight: '1.4em' }}>
                    These Terms of Use are the entire agreement between you and PhiLance with respect to the use of this Website. If any provision of the Terms of Use is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that the Terms of Use will otherwise remain in full force and effect and enforceable. The Terms of Use are personal to you, and are not assignable, transferable or sublicensable by you except with PhiLance's prior written consent. PhiLance may assign, transfer or delegate any of its rights and obligations hereunder without consent. No agency, partnership, joint venture, or employment relationship is created as a result of these Terms of Use and neither party has any authority of any kind to bind the other in any respect.
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

TermAndCondition.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(TermAndConditionStyle)(TermAndCondition);
