import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RootState } from "../../stores/reducers";
import { setVisibilityFilter, TodoFilter } from "../../stores/actions";
import Link from "../../components/Link";

type OwnProps = {
  filter: TodoFilter;
};

const mapStateToProps = (state: RootState, ownProps: OwnProps) => ({
  active: ownProps.filter === state.visibilityFilter,
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => ({
  onClick: () => dispatch(setVisibilityFilter(ownProps.filter)),
});

// mapDispatchToProps用于建立组件和store.dispatch的映射关系。它可以是一个对象，也可以是一个函数，
// 当它是一个函数的时候，第一个参数就是dispatch，第二个参数是组件自身的props。

export default connect(mapStateToProps, mapDispatchToProps)(Link);
