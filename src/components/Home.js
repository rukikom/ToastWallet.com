import React, { Component } from 'react';
import { Button, Colors, Row, Column } from 'react-foundation';
import FaLock from 'react-icons/lib/fa/lock';
import FaMobile from 'react-icons/lib/fa/mobile';
import FaBolt from 'react-icons/lib/fa/bolt';
import FaWindows from 'react-icons/lib/fa/windows';
import FaApple from 'react-icons/lib/fa/apple';
import FaAndroid from 'react-icons/lib/fa/android';
import FaLinux from 'react-icons/lib/fa/linux';
import FaChrome from 'react-icons/lib/fa/chrome';
import FaDownload from 'react-icons/lib/fa/download';
import ReactTooltip from 'react-tooltip';
import * as platform from 'platform';
import * as Scroll from 'react-scroll';
import {
  Element,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from 'react-scroll';
import { toast } from 'react-toastify';
import Slider from 'react-slick';

import toastImg from '../images/toast_trans.png';
import githubIcon from '../images/github.png';
import communityIcon from '../images/people.png';
import appStoreIcon from '../images/app_store_badge.png';
import googlePlayIcon from '../images/google_play_badge.png';
import ss1 from '../images/ss1.png';
import ss2 from '../images/ss2.png';
import ss3 from '../images/ss3.png';
import ss4 from '../images/ss4.png';

export default class Home extends Component {
  state = {
    windowsDownloadsVisible: false,
  };
  constructor(props) {
    super(props);
  }

  getOSName = () => {
    switch (platform.os.family.toLowerCase()) {
      case 'windows':
      case 'windows Server 2008 r2 / 7':
      case 'windows server 2008 / Vista':
      case 'windows xp':
        return 'Windows';
      case 'os x':
      case 'macos':
        return 'macOS';
      case 'ubuntu':
      case 'debian':
      case 'fedora':
      case 'red hat':
      case 'suse':
        return 'Linux';
      case 'android':
        return 'Android';
      case 'ios':
        return 'iOS';
      case 'windows phone':
      default:
        return null;
    }
  };

  getOSDownload = () => {
    switch (platform.os.family.toLowerCase()) {
      case 'windows':
      case 'windows Server 2008 r2 / 7':
      case 'windows server 2008 / Vista':
      case 'windows xp':
        return null;
      case 'os x':
      case 'macos':
        return 'https://toastwallet.com/download/mac/ToastWallet-2.1.34.dmg';
      case 'ubuntu':
      case 'debian':
      case 'fedora':
      case 'red hat':
      case 'suse':
        return 'https://toastwallet.com/download/linux/ToastWallet-2.1.34-x86_64.AppImage';
      case 'android':
        return 'https://play.google.com/store/apps/details?id=com.toastwallet.core&hl=en';
      case 'ios':
        return 'https://appsto.re/us/adIFlb.i';
      case 'windows phone':
      default:
        return null;
    }
  };

  toggleWindowsDownloads = () => {
    this.setState(
      Object.assign({}, this.state, {
        windowsDownloadsVisible: !this.state.windowsDownloadsVisible,
      })
    );
  };

  onDownloadClick = () => {
    const osName = this.getOSName();
    if (osName === 'Windows') {
      Object.assign({}, this.state, {
        windowsDownloadsVisible: true,
      });
      scroller.scrollTo('downloads', {
        duration: 500,
        smooth: 'easeInOutCubic',
        smooth: true,
        offset: 50,
      });
    } else {
      const link = this.getOSDownload();
      if (link != null) {
        window.open(link, '_blank');
      } else {
        toast.error(
          `ToastWallet doesn't support ${platform.os
            .family}, hop on discord for help`
        );
      }
    }
  };

  renderWindowsDownloads = () => {
    return (
      <div>
        <Row className="downloads-container" isExpanded>
          <Column small={12} large={9} offsetOnLarge={2}>
            <ul className="dark-text">
              <li>
                <a
                  target="_blank"
                  href="https://toastwallet.com/download/windows/ToastWallet-2.1.34.appx"
                >
                  Windows 10 Installer
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://toastwallet.com/download/windows/ToastWallet%20Setup%202.1.34.exe"
                >
                  Windows 7 Installer
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://toastwallet.com/download/windows/ToastWallet%202.1.34.exe"
                >
                  Portable Executable (No installation required)
                </a>
              </li>
            </ul>
          </Column>
        </Row>
        <Row className="downloads-container" isExpanded>
          <Column small={12} large={6} offsetOnLarge={2}>
            <p className="dark-text windows-info">
              If you are upgrading please use the same type of installer you
              used last time. For example if you used the Windows 10 installer
              for the last version you installed then you should use the Windows
              10 installer for the update.
            </p>
          </Column>
        </Row>
      </div>
    );
  };

  render() {
    const store = this.store;
    const osName = this.getOSName();

    const sliderSettings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      autoplay: true,
    };
    return (
      <div>
        <ReactTooltip />
        <Row className="container blue-container" isExpanded>
          <Column small={12} large={2}>
            <img
              className="toast-img"
              width="128px"
              height="128px"
              src={toastImg}
              alt="toastwallet"
            />
          </Column>
          <Column small={12} large={10}>
            <h1 className="header-text">ToastWallet</h1>
            <h4 className="header-text">
              A free open source Ripple XRP Wallet for iOS, Android, Windows,
              Mac and Linux.
            </h4>
            <h5 className="header-text">Available on:</h5>
            <FaWindows data-tip="Windows" size={36} className="os-icon" />
            <FaApple data-tip="iOS & macOS" size={36} className="os-icon" />
            <FaAndroid data-tip="Android" size={36} className="os-icon" />
            <FaLinux data-tip="Linux" size={36} className="os-icon" />
            <FaChrome data-tip="Google Chrome" size={36} className="os-icon" />
            <Row className="header-buttons">
              <Button onClick={this.onDownloadClick} className="button">
                Download {osName != null ? `for ${osName}` : ''}
              </Button>
              <Button className="button">Discord/Support</Button>
            </Row>
          </Column>
        </Row>
        <div className="container">
          <Element name="downloads">
            <Row isExpanded>
              <Column small={12} large={2}>
                <FaDownload className="download-icon" size={126} />
              </Column>
              <Column small={12} large={8}>
                <h3 className="subheader-text">Downloads</h3>
                <p className="dark-text">
                  ToastWallet is available on Windows, iOS, macOS (OSX),
                  Android, Linux and Google Chrome (extension). If you are
                  currently on a platform which you don't see listed hop on
                  discord{' '}
                  <a target="_blank" href="https://toastwallet.com/discord">
                    here
                  </a>{' '}
                  and ask for help! To download just select the platform you
                  need below:
                </p>
              </Column>
              <Column small={0} large={1} />
            </Row>
            <Row className="downloads-container" isExpanded>
              <Column small={12} large={9} offsetOnLarge={2}>
                <h4>PC/Tablet</h4>
                <hr />
                <FaWindows
                  data-tip="Windows"
                  size={48}
                  className="os-icon clickable dark-icon"
                  onClick={this.toggleWindowsDownloads}
                />
                <a
                  target="_blank"
                  href="https://toastwallet.com/download/mac/ToastWallet-2.1.34.dmg"
                >
                  <FaApple
                    data-tip="macOS"
                    size={48}
                    className="os-icon clickable dark-icon"
                  />
                </a>
                <a
                  target="_blank"
                  href="https://toastwallet.com/download/linux/ToastWallet-2.1.34-x86_64.AppImage"
                >
                  <FaLinux
                    data-tip="Linux"
                    size={48}
                    className="os-icon clickable dark-icon"
                  />
                </a>
                <a target="_blank" href="https://toastwallet.com/browser/">
                  <FaChrome
                    data-tip="Google Chrome"
                    size={48}
                    className="os-icon clickable dark-icon"
                  />
                </a>
              </Column>
            </Row>
            {this.state.windowsDownloadsVisible
              ? this.renderWindowsDownloads()
              : null}
            <Row className="downloads-container" isExpanded>
              <Column small={12} large={9} offsetOnLarge={2}>
                <h4>Mobile</h4>
                <hr />
                <a
                  target="_blank"
                  hreff="https://play.google.com/store/apps/details?id=com.toastwallet.core&hl=en"
                  href="https://appsto.re/us/adIFlb.i"
                >
                  <img src={appStoreIcon} width="200px" />
                </a>
                <a
                  target="_blank"
                  href="https://play.google.com/store/apps/details?id=com.toastwallet.core&hl=en"
                >
                  <img
                    className="android-badge"
                    src={googlePlayIcon}
                    width="240px"
                  />
                </a>
              </Column>
            </Row>
          </Element>
        </div>
        <Row className="container grey-blue-container" isExpanded>
          <Column className="center" small={12} large={4}>
            <FaLock color="#3b9c09" size={100} className="icon" />
            <p className="light-text">
              ToastWallet stores all your account information on your computer.
              Make sure to backup your wallet/recovery phrase/pass phrase as we
              don't store these anywhere for you. As long as you keep your
              computer safe you have nothing to worry about!
            </p>
          </Column>
          <Column className="center" small={12} large={4}>
            <FaMobile color="#2d2d2d" size={100} className="icon" />
            <p className="light-text">
              ToastWallet supports all major computer and mobile phone operating
              systems. You can use and sync your Toast Wallet whether you're on
              Android, iOS, Android, Mac or Windows. The interface also remains
              very much the same no matter where you use it!!
            </p>
          </Column>
          <Column className="center" small={12} large={4}>
            <FaBolt color="#ffae00" size={100} className="icon" />
            <p className="light-text">
              Enjoy the speed of the Ripple network along with the ease of use
              of ToastWallet with no extra overhead. ToastWallet sends
              transactions directly from your computer to the Ripple Network
              with no extra overhead. This means you get to enjoy the ease of
              use of ToastWallet with the sweet speeds of the Ripple Network!!
            </p>
          </Column>
        </Row>
        <Row className="container" isExpanded>
          <Column small={12} large={9}>
            <h3 className="subheader-text dark-text">Easy to use!</h3>
            <p className="dark-text">
              We've set out to build a truly cross-platform Ripple wallet that's
              simple enough for your grandma but safe enough for a Swiss banker.
              Whether you're using it on your home computer, tablet or phone
              ToastWallet always has the same intuitive interface and
              functionality.
            </p>
            <p className="dark-text top-gap">
              Make sure you read through the FAQ which can be found{' '}
              <a target="_blank" href="https://toastwallet.com/faq">
                here
              </a>{' '}
              before you start using Toast Wallet as it may save you some time
              in the long run.
            </p>
            <p className="dark-text top-gap">
              We hope you enjoy using it as much as we've enjoyed building it.
              If you have any suggestions we'd love to hear them, just hop on
              our discord which can be found{' '}
              <a target="_blank" href="https://toastwallet.com/discord">
                here
              </a>{' '}
              and tell us about them!
            </p>
          </Column>
          <Column small={12} large={3}>
            <div className="slider-container">
              <Slider className="screenshot" {...sliderSettings}>
                <img src={ss1} />
                <img src={ss2} />
                <img src={ss3} />
                <img src={ss4} />
              </Slider>
            </div>
          </Column>
        </Row>
        <Row className="container grey-blue-container" isExpanded>
          <Column small={12} large={2} offsetOnLarge={0}>
            <a target="_blank" href="https://github.com/ToastWallet/core">
              <img src={githubIcon} alt="github" />
            </a>
          </Column>
          <Column small={12} large={8}>
            <h3 className="subheader-text">Open Source</h3>
            <p className="light-text">
              All of ToastWallet's code is open source and viewable by anyone.
              We welcome anyone who wants to contribute and suggest changes/new
              features. Click{' '}
              <a target="_blank" href="https://github.com/ToastWallet/core">
                here
              </a>{' '}
              to check out our GitHub repository! If you need help getting
              started you can join our discord{' '}
              <a target="_blank" href="https://toastwallet.com/discord">
                here
              </a>{' '}
              and there's bound to be someone online who can help you out!
            </p>
          </Column>
          <Column small={0} large={1} />
        </Row>
      </div>
    );
  }
}
