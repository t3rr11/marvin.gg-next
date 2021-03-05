import React from 'react';
import Link from 'next/link';
import { generate } from 'build-number-generator';
import navStyles from '../styles/Nav.module.css';

class Nav extends React.Component {

  constructor() { 
    super()
    this.state = {
      loggedIn: false,
      isAdmin: false,
      discordInfo: false,
      backgrounds: [],
      background: false,
      menuOpen: false
    };
  }
  
  componentDidMount() {
    this.checkLogin();
    this.setState({
      loggedIn: localStorage.getItem('discordInfo') ? true : false,
      isAdmin: localStorage.getItem('adminToken') || false,
      discordInfo: localStorage.getItem('discordInfo') || false,
      backgrounds: this.props.backgrounds || [],
      background: localStorage.getItem("background") || false,
      menuOpen: false
    });
  }

  GotoAuth() { this.setPage("home"); discord.linkWithDiscord(); }

  checkLogin() {
    // if(localStorage.getItem("adminToken")) {
    //   const adminToken = localStorage.getItem("adminToken");
    //   apiRequest.CheckAuthorization({ token: adminToken }).then((response) => { if(response.code === 200) { this.setState({ isAdmin: true }); } });
    // }
    // if(this.props.discordInfo) { this.setState({ loggedIn: true, discordInfo: this.props.discordInfo }); }
  }
  toggleMenuSlider() {
    this.setState({ menuOpen: !this.state.menuOpen });
    console.log("Toggled Menu");
  }
  hideMenuSlider() { this.setState({ menuOpen: false }); }
  setPage = (page) => {
    this.props.setPage(page);
    this.toggleMenuSlider();
  }
  setSubPage = (page) => {
    this.props.setSubPage(page);
    this.toggleMenuSlider();
  }

  render() {
    console.log(this.state.loggedIn);
    const { loggedIn, isAdmin, background, backgrounds, discordInfo } = this.state;
    return (
      <header className={navStyles.header}>
        <div className={navStyles.topHeader}>
          <div className={navStyles.headerLogo}>
            <img src="/images/icons/logo.png" alt="logo" />
            <div className={navStyles.headerHomeLink}>Marvin</div>
          </div>
          <div className={navStyles.headerUserContainter}>
          {
            loggedIn ? 
            (<div className={navStyles.headerUsername}>{ <div>{`${ discordInfo.username }#${ discordInfo.discriminator }`}</div> }</div>) :
            (<div className={navStyles.headerLoginLink} onClick={ (() => this.GotoAuth()) }>Connect</div>)
          }
          </div>
        </div>
        <div className={navStyles.leftHeader}>
          <LeftHeader 
            currentPage={ this.props.currentPage } currentSubPage={ this.props.currentSubPage } setPage={ this.setPage } setSubPage={ this.setSubPage }
            loggedIn={ loggedIn } isAdmin={ isAdmin } backgrounds={ backgrounds } background={ background }
          />
        </div>
        <div className={`${ this.state.menuOpen ? navStyles.mobileHeader : navStyles.mobileHeaderHidden }`} style={{ background: `var(--${this.props.currentBackground})` }}>
          <LeftHeader
            currentPage={ this.props.currentPage } currentSubPage={ this.props.currentSubPage } setPage={ this.setPage } setSubPage={ this.setSubPage }
            loggedIn={ loggedIn } isAdmin={ isAdmin } backgrounds={ backgrounds } background={ background }
          />
        </div>
        <div className={navStyles.menuSliderBtn} onClick={ (() => this.toggleMenuSlider())}>
          ≡
        </div>
      </header>
    )
  }
}

class LeftHeader extends React.Component {
  render() {
    return (
      <>
        <div className={navStyles.headerMenu}>
          <div className={`${ this.props.currentPage === "home" ? navStyles.headerMenuItemContainerActive : navStyles.headerMenuItemContainer }`}>
            <div className={`${ this.props.currentPage === "home" ? navStyles.headerMenuItemActive : navStyles.headerMenuItem }`}>
              <img alt="home-icon" className={navStyles.headerMenuItemIcon} src="/images/icons/home.png" />
              <Link href="/home"><span className={navStyles.headerLink} onClick={ () => this.props.setPage("home") }>Home</span></Link>
              <img alt="arrow-icon" className={`${ this.props.currentPage === "home" ? navStyles.headerMenuItemArrowActive : navStyles.headerMenuItemArrow }`} src="/images/icons/arrow.png" />
            </div>
          </div>
          <div className={`${ this.props.currentPage === "commands" ? navStyles.headerMenuItemContainerActive : navStyles.headerMenuItemContainer }`}>
            <div className={`${ this.props.currentPage === "home" ? navStyles.headerMenuItemActive : navStyles.headerMenuItem }`}>
              <img alt="info-icon" className={navStyles.headerMenuItemIcon} src="/images/icons/info.png" />
              <Link href="/commands"><span className={navStyles.headerLink} onClick={ () => this.props.setPage("commands") }>Commands</span></Link>
              <img alt="arrow-icon" className={`${ this.props.currentPage === "commands" ? navStyles.headerMenuItemArrowActive : navStyles.headerMenuItemArrow }`} src="/images/icons/arrow.png" />
            </div>
          </div>
          <div className={`${ this.props.currentPage === "clans" ? navStyles.headerMenuItemContainerActive : navStyles.headerMenuItemContainer }`}>
            <div className={`${ this.props.currentPage === "clans" ? navStyles.headerMenuItemActive : navStyles.headerMenuItem }`}>
              <img alt="clans-icon" className={navStyles.headerMenuItemIcon} src="/images/icons/clans.png" />
              <Link href="/clans"><span className={navStyles.headerLink} onClick={ () => this.props.setPage("clans") }>Clans</span></Link>
              <img alt="arrow-icon" className={`${ this.props.currentPage === "clans" ? navStyles.headerMenuItemArrowActive : navStyles.headerMenuItemArrow }`} src="/images/icons/arrow.png" />
            </div>
          </div>
          <div className={`${ this.props.currentPage === "dashboard" ? navStyles.headerMenuItemContainerActive : navStyles.headerMenuItemContainer }`}>
            <div className={`${ this.props.currentPage === "dashboard" ? navStyles.headerMenuItemActive : navStyles.headerMenuItem }` }>
              <img alt="discord-icon" className={navStyles.headerMenuItemIcon} src="/images/icons/dashboard.png" />
              <Link href="/dashboard"><span className={navStyles.headerLink} onClick={ () => this.props.setPage("dashboard") }>Dashboard</span></Link>
              <img alt="arrow-icon" className={`${ this.props.currentPage === "dashboard" ? navStyles.headerMenuItemArrowActive : navStyles.headerMenuItemArrow }`} src="/images/icons/arrow.png" />
            </div>
            <div className={`${ this.props.currentPage === "dashboard" ? navStyles.subMenuItemsActive : navStyles.subMenuItems }`}>
              <div className={`${ this.props.currentSubPage === "serverDetails" ? navStyles.subMenuItemActive : navStyles.subMenuItem }`} onClick={ () => this.props.setSubPage("serverDetails") }>Server Details</div>
              <div className={`${ this.props.currentSubPage === "serverRankings" ? navStyles.subMenuItemActive : navStyles.subMenuItem }`} onClick={ () => this.props.setSubPage("serverRankings") }>Server Rankings</div>
              <div className={`${ this.props.currentSubPage === "manageMarvin" ? navStyles.subMenuItemActive : navStyles.subMenuItem }`} onClick={ () => this.props.setSubPage("manageMarvin") }><s>Manage Marvin</s></div>
            </div>
          </div>
          {
            this.props.currentPage === "guild" || this.props.currentPage === "leaderboards" || this.props.loggedIn ? (
              <div className={this.props.currentPage === "guild" || this.props.currentPage === "leaderboards" ? navStyles.headerMenuItemContainerActive : navStyles.headerMenuContainerItem}>
                <div className={this.props.currentPage === "guild" || this.props.currentPage === "leaderboards" ? navStyles.headerMenuItemActive : navStyles.headerMenuItem}>
                  <img alt="discord-icon" className={navStyles.headerMenuItemIcon} src="/images/icons/graph.png" />
                  <Link href="/leaderboards"><span className={navStyles.headerLink} onClick={ () => this.props.setPage("leaderboards") }>Leaderboards</span></Link>
                  <img alt="arrow-icon" className={`${ this.props.currentPage === "guild" || this.props.currentPage === "leaderboards" ? navStyles.headerMenuItemArrowActive : navStyles.headerMenuItemArrow }`} src="/images/icons/arrow.png" />
                </div>
                <div className={`${ this.props.currentPage === "guild" || this.props.currentPage === "leaderboards" ? navStyles.subMenuItemsActive : navStyles.subMenuItems } transScrollbar`}>
                  <div className={`${ this.props.currentSubPage === "valor" ? navStyles.subMenuItemActive : navStyles.subMenuItem }`} onClick={ () => this.props.setSubPage("valor") }>Valor</div>
                  <div className={`${ this.props.currentSubPage === "glory" ? navStyles.subMenuItemActive : navStyles.subMenuItem }`} onClick={ () => this.props.setSubPage("glory") }>Glory</div>
                  <div className={`${ this.props.currentSubPage === "infamy" ? navStyles.subMenuItemActive : navStyles.subMenuItem }`} onClick={ () => this.props.setSubPage("infamy") }>Infamy</div>
                  <div className={`${ this.props.currentSubPage === "seasonRank" ? navStyles.subMenuItemActive : navStyles.subMenuItem }`} onClick={ () => this.props.setSubPage("seasonRank") }>Season Rank</div>
                  <div className={`${ this.props.currentSubPage === "timePlayed" ? navStyles.subMenuItemActive : navStyles.subMenuItem }`} onClick={ () => this.props.setSubPage("timePlayed") }>Time Played</div>
                  <div className={`${ this.props.currentSubPage === "highestPower" ? navStyles.subMenuItemActive : navStyles.subMenuItem }`} onClick={ () => this.props.setSubPage("highestPower") }>Highest Power</div>
                  <div className={`${ this.props.currentSubPage === "ironBanner" ? navStyles.subMenuItemActive : navStyles.subMenuItem }`} onClick={ () => this.props.setSubPage("ironBanner") }>Iron Banner</div>
                  <div className={`${ this.props.currentSubPage === "levi" ? navStyles.subMenuItemActive : navStyles.subMenuItem }`} onClick={ () => this.props.setSubPage("levi") }>Leviathan Clears</div>
                  <div className={`${ this.props.currentSubPage === "eow" ? navStyles.subMenuItemActive : navStyles.subMenuItem }`} onClick={ () => this.props.setSubPage("eow") }>Eater of Worlds Clears</div>
                  <div className={`${ this.props.currentSubPage === "sos" ? navStyles.subMenuItemActive : navStyles.subMenuItem }`} onClick={ () => this.props.setSubPage("sos") }>Spire of Stars Clears</div>
                  <div className={`${ this.props.currentSubPage === "pLevi" ? navStyles.subMenuItemActive : navStyles.subMenuItem }`} onClick={ () => this.props.setSubPage("pLevi") }>Prestige Levi Clears</div>
                  <div className={`${ this.props.currentSubPage === "pEoW" ? navStyles.subMenuItemActive : navStyles.subMenuItem }`} onClick={ () => this.props.setSubPage("pEoW") }>Prestige EoW Clears</div>
                  <div className={`${ this.props.currentSubPage === "pSoS" ? navStyles.subMenuItemActive : navStyles.subMenuItem }`} onClick={ () => this.props.setSubPage("pSoS") }>Prestige SoS Clears</div>
                  <div className={`${ this.props.currentSubPage === "lastWish" ? navStyles.subMenuItemActive : navStyles.subMenuItem }`} onClick={ () => this.props.setSubPage("lastWish") }>Last Wish Clears</div>
                  <div className={`${ this.props.currentSubPage === "scourge" ? navStyles.subMenuItemActive : navStyles.subMenuItem }`} onClick={ () => this.props.setSubPage("scourge") }>Scourge of the Past</div>
                  <div className={`${ this.props.currentSubPage === "sorrows" ? navStyles.subMenuItemActive : navStyles.subMenuItem }`} onClick={ () => this.props.setSubPage("sorrows") }>Crown of Sorrows</div>
                  <div className={`${ this.props.currentSubPage === "garden" ? navStyles.subMenuItemActive : navStyles.subMenuItem }`} onClick={ () => this.props.setSubPage("garden") }>Garden of Salvation</div>
                  <div className={`${ this.props.currentSubPage === "dsc" ? navStyles.subMenuItemActive : navStyles.subMenuItem }`} onClick={ () => this.props.setSubPage("dsc") }>Deep Stone Crypt</div>
                  <div className={`${ this.props.currentSubPage === "shatteredThrone" ? navStyles.subMenuItemActive : navStyles.subMenuItem }`} onClick={ () => this.props.setSubPage("shatteredThrone") }>Shattered Throne</div>
                  <div className={`${ this.props.currentSubPage === "pitOfHeresy" ? navStyles.subMenuItemActive : navStyles.subMenuItem }`} onClick={ () => this.props.setSubPage("pitOfHeresy") }>Pit of Heresy</div>
                  <div className={`${ this.props.currentSubPage === "prophecy" ? navStyles.subMenuItemActive : navStyles.subMenuItem }`} onClick={ () => this.props.setSubPage("prophecy") }>Prophecy</div>
                  <div className={`${ this.props.currentSubPage === "totalRaids" ? navStyles.subMenuItemActive : navStyles.subMenuItem }`} onClick={ () => this.props.setSubPage("totalRaids") }>Total Raid Clears</div>
                  <div className={`${ this.props.currentSubPage === "activeScore" ? navStyles.subMenuItemActive : navStyles.subMenuItem }`} onClick={ () => this.props.setSubPage("activeScore") }>Active Triumph Score</div>
                  <div className={`${ this.props.currentSubPage === "legacyScore" ? navStyles.subMenuItemActive : navStyles.subMenuItem }`} onClick={ () => this.props.setSubPage("legacyScore") }>Legacy Triumph Score</div>
                  <div className={`${ this.props.currentSubPage === "lifetimeScore" ? navStyles.subMenuItemActive : navStyles.subMenuItem }`} onClick={ () => this.props.setSubPage("lifetimeScore") }>Lifetime Triumph Score</div>
                </div>
              </div>
            ) : null
          }
          {
            this.props.isAdmin ? (
              <>
                <div className={`${ this.props.currentPage === "logs" ? navStyles.headerMenuItemContainerActive : navStyles.headerMenuContainerItem }`}>
                  <div className={ `${ this.props.currentPage === "logs" ? navStyles.headerMenuItemActive : navStyles.headerMenuItem }` }>
                    <img alt="logs-icon" className={navStyles.headerMenuItemIcon} src="/images/icons/logs.png" />
                    <Link href="/logs"><span className={navStyles.headerLink} onClick={ () => this.props.setPage("logs") }>Logs</span></Link>
                    <img alt="arrow-icon" className={`${ this.props.currentPage === "logs" ? navStyles.headerMenuItemArrowActive : navStyles.headerMenuItemArrow }`} src="/images/icons/arrow.png" />
                  </div>
                </div>
                <div className={`${ this.props.currentPage === "status" ? navStyles.headerMenuItemContainerActive : navStyles.headerMenuContainerItem }`}>
                  <div className={ `${ this.props.currentPage === "status" ? navStyles.headerMenuItemActive : navStyles.headerMenuItem }` }>
                    <img alt="discord-icon" className={navStyles.headerMenuItemIcon} src="/images/icons/discord.png" />
                    <Link href="/status"><span className={navStyles.headerLink} onClick={ () => this.props.setPage("status") }>Status</span></Link>
                    <img alt="arrow-icon" className={`${ this.props.currentPage === "status" ? navStyles.headerMenuItemArrowActive : navStyles.headerMenuItemArrow }`} src="/images/icons/arrow.png" />
                  </div>
                </div>
                <div className={`${ this.props.currentPage === "graphs" ? navStyles.headerMenuItemContainerActive : navStyles.headerMenuContainerItem }`}>
                  <div className={ `${ this.props.currentPage === "graphs" ? navStyles.headerMenuItemActive : navStyles.headerMenuItem }` }>
                    <img alt="graph-icon" className={navStyles.headerMenuItemIcon} src="/images/icons/graph.png" />
                    <Link href="/graphs"><span className={navStyles.headerLink} onClick={ () => this.props.setPage("graphs") }>Graphs</span></Link>
                    <img alt="arrow-icon" className={`${ this.props.currentPage === "graphs" ? navStyles.headerMenuItemArrowActive : navStyles.headerMenuItemArrow }`} src="/images/icons/arrow.png" />
                  </div>
                </div>
              </>
            ) : null
          }
        </div>
        <div className={navStyles.backgroundColors}>
          <div className={navStyles.autoColorBox} style={ this.props.background ?  { border: "1px solid white", margin: "1px", marginTop: "10px" } : { } } onClick={ (() => this.props.setBackground("Auto")) }>Auto</div>
          { 
            this.props.backgrounds.map((bg) => {
              let style;
              if(this.props.currentBackground === bg) { style = { background: `var(--${ bg })`, border: `1px solid white` } }
              else { style = { background: `var(--${ bg })` } }
              return <div className={navStyles.colorBox} style={ style } onClick={ (() => this.props.setBackground(bg)) }></div>
            })
          }
        </div>
        <div className={navStyles.donationLinks}>
          <a href="https://paypal.me/guardianstats" target="_blank" className={navStyles.donationLinkPaypal}><img src="/images/icons/paypal.png" width="26px" height="26px" /></a>
          <a href="https://www.patreon.com/Terrii" target="_blank" className={navStyles.donationLinkPatreon}><img src="/images/icons/patreon.png" width="26px" height="26px" /></a>
          <a href="https://ko-fi.com/terrii_dev" target="_blank" className={navStyles.donationLinkKofi}><img src="/images/icons/kofi.png" width="26px" height="26px" /><span>Buy me a coffee?</span></a>
        </div>
        <div className={navStyles.footer}>Beta { generate({ version: this.props.siteVersion, versionSeparator: "-" })}</div>
      </>
    )
  }
}

export default Nav;
