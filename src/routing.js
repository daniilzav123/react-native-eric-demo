import React from "react";
import { StackNavigator } from "react-navigation";
import { Text, TextInput } from "react-native";
import {
	SplashScene,
	MainScene,
	LoginScene,
	MyAccountScene,
	GenealogyScene,
	TradeScene,
	ExchangeMarketScene,
	ProductScene,
	WalletScene,
	ReportScene,
	HelpdeskScene,
	NewsUpdateScene,
	AddTicketScene,
	ReplyTicketScene,
	AddBankScene,
	RegisterNewMemberScene,
	GroupScene,
} from "AppScenes";

Text.defaultProps = {
	allowFontScaling: false
};

TextInput.defaultProps = {
	underlineColorAndroid: "transparent"
};

export const Routing = StackNavigator({
	initialRouteName: { screen: SplashScene },
	Splash: { screen: SplashScene },
	Login: { screen: LoginScene },
	Main: { screen: MainScene },
	MyAccount: { screen: MyAccountScene },
	Genealogy: { screen: GenealogyScene },
	Trade: { screen: TradeScene },
	ExchangeMarket: { screen: ExchangeMarketScene },
	Product: { screen: ProductScene },
	Wallet: { screen: WalletScene },
	Report: { screen: ReportScene },
	HelpDesk: { screen: HelpdeskScene },
	NewsUpdate: { screen: NewsUpdateScene },
	AddTicket: { screen: AddTicketScene },
	ReplyTicket: { screen: ReplyTicketScene },
	AddBank: { screen: AddBankScene },
	RegisterNewMember: { screen: RegisterNewMemberScene },
	Group: { screen: GroupScene },
});
