import {combineReducers} from "redux";
import {NOTIFIER_STORE_NAME, notifierReducer} from "../components/Notifier/notifierSlice";
import {NAVIGATION_MENU_STORE_NAME, navigationMenuReducer} from "../components/SidebarMenu/redux/navigationMenuSlice";
import {ADDRESSES_STORE_NAME, addressesReducer} from "../pages/Private/Addresses/redux/addressesSlice";
import {MASTERNODES_STORE_NAME, masternodesReducer} from "../pages/Private/Masternodes/redux/masternodesSlice";
import {USER_SESSION_STORE_NAME, userSessionReducer} from "./userSessionSlice";
import {CREATE_NEW_WALLET_STORE_NAME, createNewWalletReducer} from "../pages/Login/redux/createNewWalletSlice";
import {IMPORT_NEW_ADDRESS_STORE_NAME, importAddressReducer} from "../pages/Login/redux/importAddressSlice";
import {ACCOUNT_BALANCE_STORE_NAME, accountBalanceReducer} from "../pages/Private/Dashboard/redux/accountBalanceSlice";
import {LATEST_TRANSACTIONS_STORE_NAME, latestTransactionsReducer} from "../pages/Private/Dashboard/redux/latestTransactionsSlice";
import {ACCOUNT_ADDRESSES_STORE_NAME, accountAddressesReducer} from "../pages/Private/Receive/redux/accountAddressesSlice";
import {WALLET_INFO_STORE_NAME, walletInfoReducer} from "../pages/Private/Settings/redux/walletInfoSlice";
import {SEND_TRANSACTION_STORE_NAME, sendTransactionReducer} from "../pages/Private/Send/redux/sendTransactionSlice";
import {ACCOUNT_TRANSACTIONS_STORE_NAME, accountTransactionsReducer} from "../pages/Private/Transactions/redux/getTransactionsSlice";
import {GET_XDN_PRICE_STORE_NAME, getXdnPriceReducer} from "../pages/Public/redux/getXdnPriceSlice";
import {GET_BTC_USD_PRICE_STORE_NAME, getBtcUsdPriceReducer} from "../pages/Public/redux/getBtcUsdPriceSlice";
import {accountMessagesReducer, MESSAGES_STORE_NAME} from "../pages/Private/Messages/redux/messagesInboxSlice";
import {CONVERSATION_STATE_STORE_NAME, conversationMessagesReducer} from "../pages/Private/Messages/Conversation/redux/conversationStateSlice";

const reducerList = {
    [NOTIFIER_STORE_NAME]: notifierReducer,
    [NAVIGATION_MENU_STORE_NAME]: navigationMenuReducer,
    [ADDRESSES_STORE_NAME]: addressesReducer,
    [MASTERNODES_STORE_NAME]: masternodesReducer,
    [ACCOUNT_BALANCE_STORE_NAME]: accountBalanceReducer,
    [USER_SESSION_STORE_NAME]: userSessionReducer,
    [CREATE_NEW_WALLET_STORE_NAME]: createNewWalletReducer,
    [IMPORT_NEW_ADDRESS_STORE_NAME]: importAddressReducer,
    [LATEST_TRANSACTIONS_STORE_NAME]: latestTransactionsReducer,
    [ACCOUNT_ADDRESSES_STORE_NAME]: accountAddressesReducer,
    [WALLET_INFO_STORE_NAME]: walletInfoReducer,
    [SEND_TRANSACTION_STORE_NAME]: sendTransactionReducer,
    [ACCOUNT_TRANSACTIONS_STORE_NAME]: accountTransactionsReducer,
    [GET_XDN_PRICE_STORE_NAME]: getXdnPriceReducer,
    [GET_BTC_USD_PRICE_STORE_NAME]: getBtcUsdPriceReducer,
    [MESSAGES_STORE_NAME]: accountMessagesReducer,
    [CONVERSATION_STATE_STORE_NAME]: conversationMessagesReducer
}

const rootReducer = combineReducers(reducerList);
export default rootReducer;
