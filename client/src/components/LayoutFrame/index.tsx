import * as React from 'react'
import { useState, useEffect, useContext } from 'react'
import { Grid, makeStyles, createStyles, IconButton } from '@material-ui/core';
import discord from '../../../src/images/behodler/footer/discord.png'
import medium from '../../../src/images/behodler/footer/medium.png'
import github from '../../../src/images/behodler/footer/Github.png'
import faq from '../../../src/images/behodler/footer/FAQ.png'
import uniswap from '../../../src/images/behodler/footer/uniswap.png'
import telegram from '../../../src/images/behodler/footer/telegram.png'

import { Route, Switch, Redirect } from 'react-router-dom'
import Swap, { permittedRoutes as permittedBehodlerRoutes } from '../Behodler/Swap/index'
import Admin from '../Behodler/Admin/index'

import MetamaskNotFound from './MetamaskNotFound'
import { WalletContext } from '../Contexts/WalletStatusContext'

//ocean, forest,skybackground
import backImage from '../../images/behodler/ocean.gif'
const useStyles = makeStyles(theme => createStyles({
	layoutFrameroot: {
		display: "flex",
		flexFlow: 'column',
		height: '100%',
		width: '100%',
		paddingBottom: 200,
		backgroundImage: `url(${backImage})`,
		backgroundRepeat: 'repeat-y',
		backgroundSize: 'cover',
		overflowY: 'hidden',
	},
	layoutFramerRotNotConnected: {
		display: "flex",
		flexFlow: 'column',
		height: '100%',
		width: '100%',
		background: "linear-gradient(to bottom left, #9DC8F2, white)",
		backgroundRepeat: 'repeat-y',
		backgroundSize: 'cover'
	},
	content: {
		flexGrow: 1,
		width: '100%',
		margin: 0,
		height: '100%',
	},
	footerDiv: {
		position: 'relative',
		left: 0,
		// bottom: 205,
		bottom: 0,
		width: '100%',
		color: 'black',
		textAlign: 'center',
		height: 100,

		backgroundColor: 'transparent'
	},
	footerGrid: {
		width: '100%',
		//marginBottom: '-8px',
		backgroundColor: 'transparent'
	},
	filledGrid: {
		width: '100%',
		padding: '0 !important'
	},
	whiteText: {
		color: 'white'
	},
	footerPanel: {
		backgroundColor: 'rgba(255,255,255,0.7)',
		borderRadius: 10
	}
}))



export default function LayoutFrame(props: any) {
	const [redirect, setRedirect] = useState<string>("")
	const [showMetamaskInstallPopup, setShowMetamaskInstallPopup] = useState<boolean>(false)
	const renderRedirect = redirect !== '' ? <Redirect to={redirect} /> : ''
	const walletContextProps = useContext(WalletContext)
	const setBehodlerRoute = (route: permittedBehodlerRoutes) => {
		setRedirect(route)
	}
	const footerIconWidth = 24
	useEffect(() => {
		if (renderRedirect !== '')
			setRedirect('')
	})

	const classes = useStyles()
	const FilledGridCell = (props: { children: any }) => <Grid className={classes.filledGrid} item> {props.children}</Grid>
	const notConnected: boolean = !walletContextProps.connected || walletContextProps.networkName === '' || !walletContextProps.initialized//|| walletContextProps.account.length < 5
	const openFooter = (url: string) => window.open(url, '_blank')
	return (
		<div className={notConnected ? classes.layoutFramerRotNotConnected : classes.layoutFrameroot}>
			<MetamaskNotFound show={showMetamaskInstallPopup} closeAction={setShowMetamaskInstallPopup} />
			<div>
				{renderRedirect}

			</div>
			<Grid
				container
				direction="column"
				justify="space-evenly"
				alignItems="center" className={classes.content}
				spacing={1}>
				<FilledGridCell>
					<div>
						<Switch>
							<Route path="/" exact >
								<Swap setShowMetamaskInstallPopup={setShowMetamaskInstallPopup} connected={!notConnected} setRouteValue={setBehodlerRoute} route="swap" />
							</Route>
							{walletContextProps.primary ?
								<Route path="/behodler/admin">
									<Admin />
								</Route>
								: ""
							}
							<Route path="/sisyphus">
								<Swap setShowMetamaskInstallPopup={setShowMetamaskInstallPopup} connected={!notConnected} setRouteValue={setBehodlerRoute} route="sisyphus" />
							</Route>
							<Route path="/faucet">
								<Swap setShowMetamaskInstallPopup={setShowMetamaskInstallPopup} connected={!notConnected} setRouteValue={setBehodlerRoute} route="faucet" />
							</Route>
							<Route path="/liquidity">
								<Swap setShowMetamaskInstallPopup={setShowMetamaskInstallPopup} connected={!notConnected} setRouteValue={setBehodlerRoute} route="liquidity" />
							</Route>
							<Route path="/swap">
								<Swap setShowMetamaskInstallPopup={setShowMetamaskInstallPopup} connected={!notConnected} setRouteValue={setBehodlerRoute} route="swap" />
							</Route>
							<Route path="/swap2">
								<Swap setShowMetamaskInstallPopup={setShowMetamaskInstallPopup} connected={!notConnected} setRouteValue={setBehodlerRoute} route="swap2" />
							</Route>

							<Route path="/scarcity">
								<Swap setShowMetamaskInstallPopup={setShowMetamaskInstallPopup} connected={!notConnected} setRouteValue={setBehodlerRoute} route="swap" />
							</Route>
							<Route path="/governance">
								<Swap setShowMetamaskInstallPopup={setShowMetamaskInstallPopup} connected={!notConnected} setRouteValue={setBehodlerRoute} route="governance" />
							</Route>
						</Switch>
					</div>
				</FilledGridCell>
				<FilledGridCell>
					<footer>
						<div className={classes.footerDiv}>
							<Grid
								container
								direction="column"
								justify="center"
								alignItems="center"
								spacing={2}
								className={classes.footerGrid}
							>
								<Grid item>
									<div className={classes.footerPanel}>
										<Grid
											container
											direction="row"
											justify="center"
											alignItems="center"
											spacing={2}
										>

											<Grid item>
												<IconButton title="github" onClick={() => openFooter('https://github.com/WeiDaiEcosystem')} >
													<img src={github} width={footerIconWidth} />
												</IconButton>
											</Grid>
											<Grid item>
												<IconButton title="medium" onClick={() => openFooter('https://medium.com/weidaithriftcoin')} >
													<img src={medium} width={footerIconWidth} />
												</IconButton>
											</Grid>
											<Grid item>
												<IconButton title="FAQ" onClick={() => openFooter('https://medium.com/weidaithriftcoin/faq-behodler-and-scarcity-scx-98e9baf94ea')} >
													<img src={faq} width={footerIconWidth} />
												</IconButton>
											</Grid>
											<Grid item>
												<IconButton title="discord" onClick={() => openFooter('https://discord.gg/f2pAVGa')} >
													<img src={discord} width={footerIconWidth} />
												</IconButton>
											</Grid>
											<Grid item>
												<IconButton title="uniswap" onClick={() => openFooter('https://info.uniswap.org/pair/0x6004946fc90956ccb12bd6619e437fdf99c05155')} >
													<img src={uniswap} width={footerIconWidth} />
												</IconButton>
											</Grid>
											<Grid item>
												<IconButton title="telegram" onClick={() => openFooter('https://t.me/degenvc')} >
													<img src={telegram} width={footerIconWidth} />
												</IconButton>
											</Grid>
											{walletContextProps.primary ? <Grid item>
												<IconButton title="governance" onClick={() => setBehodlerRoute('behodler/admin')} >
													<img src={faq} width={footerIconWidth} />
												</IconButton>
											</Grid> : ''}

										</Grid>
									</div>
								</Grid>
							</Grid>
						</div>
					</footer>
				</FilledGridCell>
			</Grid>
		</div>
	)
}
