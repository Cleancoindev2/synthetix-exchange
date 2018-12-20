import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../../components/header';
import Container from '../../components/container';
import BalanceChecker from '../../components/balance-checker';
import WalletConnector from '../../components/wallet-connector';
import LoadingScreen from '../../components/loading-screen';
// import Chart from '../../components/chart';
import RateList from '../../components/rate-list';
import WalletSelectorPopup from '../../components/wallet-selector-popup';
import TransactionStatusPopup from '../../components/transaction-status-popup';
import TradingWidget from '../../components/trading-widget';

import {
  walletSelectorPopupIsVisible,
  transactionStatusPopupIsVisible,
  loadingScreenIsVisible,
  getCurrentWalletInfo,
  getAvailableSynths,
  getSynthToExchange,
  getSynthToBuy,
} from '../../ducks/';
import { setAvailableSynths } from '../../ducks/synths';

import synthetixJsTools from '../../synthetixJsTool';

import styles from './exchange.module.scss';

class Exchange extends Component {
  renderWalletConnectorOrTradingWidget() {
    const { currentWalletInfo, synthToBuy, synthToExchange } = this.props;
    return currentWalletInfo && currentWalletInfo.selectedWallet ? (
      <TradingWidget />
    ) : (
      <TradingWidget />
    );
  }

  render() {
    const {
      walletSelectorPopupIsVisible,
      transactionStatusPopupIsVisible,
      loadingScreenIsVisible,
    } = this.props;
    return (
      <div className={styles.exchange}>
        <div className={styles.exchangeInner}>
          <Header />
          <div className={styles.exchangeLayout}>
            <div
              className={`${styles.exchangeLayoutColumn} ${
                styles.exchangeLayoutColumnSmall
              }`}
            >
              <Container>
                <BalanceChecker />
              </Container>
              <Container>
                {this.renderWalletConnectorOrTradingWidget()}
              </Container>
            </div>
            <div className={styles.exchangeLayoutColumn}>
              <Container>
                {/* <Chart /> */}
                <RateList />
              </Container>
            </div>
          </div>
        </div>
        <WalletSelectorPopup isVisible={walletSelectorPopupIsVisible} />
        <TransactionStatusPopup isVisible={transactionStatusPopupIsVisible} />
        <LoadingScreen isVisible={loadingScreenIsVisible} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    walletSelectorPopupIsVisible: walletSelectorPopupIsVisible(state),
    transactionStatusPopupIsVisible: transactionStatusPopupIsVisible(state),
    loadingScreenIsVisible: loadingScreenIsVisible(state),
    currentWalletInfo: getCurrentWalletInfo(state),
    availableSynths: getAvailableSynths(state),
    synthToBuy: getSynthToBuy(state),
    synthToExchange: getSynthToExchange(state),
  };
};

const mapDispatchToProps = {
  setAvailableSynths,
};

Exchange.propTypes = {
  walletSelectorPopupIsVisible: PropTypes.bool.isRequired,
  transactionStatusPopupIsVisible: PropTypes.bool.isRequired,
  loadingScreenIsVisible: PropTypes.bool.isRequired,
  currentWalletInfo: PropTypes.object.isRequired,
  setAvailableSynths: PropTypes.func.isRequired,
  availableSynths: PropTypes.array.isRequired,
  synthToBuy: PropTypes.string,
  synthToExchange: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Exchange);
