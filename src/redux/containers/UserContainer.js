import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { UserActions } from "ReduxActions";
import { createSelector } from "reselect";

export const sidebar$ = state => state.user;
const selector$ = createSelector(sidebar$, user => ({
	user
}));

const mapStateToProps = state => ({ ...selector$(state) });
const mapDispatchToProps = dispatch =>
	bindActionCreators({ ...UserActions }, dispatch);

export default component =>
	connect(mapStateToProps, mapDispatchToProps)(component);
