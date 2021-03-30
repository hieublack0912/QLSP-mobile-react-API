import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import callApi from './../../utils/apiCaller';
import {connect} from 'react-redux';
import { actAddProductsRequest, actGetProductsRequest, actUpdateProductsRequest} from './../../actions/index';


class ProductActionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            txtName: '',
            txtPrice: '',
            chkbStatus: ''
        };
    }

    componentDidMount() {
        var { match} = this.props;
        if(match){
            var id = match.params.id;
            this.props.onEditProducts(id);
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(props.itemEditing !== state.itemEditing) {
            return {
                    id: props.itemEditing.id,
                    txtName : props.itemEditing.name,
                    txtPrice : props.itemEditing.price,
                    chkbStatus : props.itemEditing.status,
                    itemEditing : props.itemEditing,
            }
        }
        return null;
    }

    render() {
        var { txtName, txtPrice, chkbStatus } = this.state;
        return (
            <div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <Link to="/product-list" type="button" className="btn btn-danger">
                        <span className="glyphicon glyphicon-chevron-left mr-10"></span>Trở lại
                    </Link>
                </div>
                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <form onSubmit={this.onSave}>
                        <div className="form-group">
                            <label>Tên Sản Phẩm: </label>
                            <input
                                type="text"
                                className="form-control"
                                name="txtName"
                                value={txtName}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Giá Sản Phẩm: </label>
                            <input
                                type="number"
                                className="form-control"
                                name="txtPrice"
                                value={txtPrice}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Trạng Thái</label>
                            <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="chkbStatus"
                                        value={chkbStatus}
                                        onChange={this.onChange}
                                        checked={chkbStatus}
                                    />
                                Còn Hàng
                            </label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            <span className="glyphicon glyphicon-floppy-disk mr-10"></span>Lưu Lại
                        </button>
                    </form>
                </div>
            </div>

        );
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        });
    }

    onSave = (e) => {
        e.preventDefault();
        var { history } = this.props;
        var { id, txtName, txtPrice, chkbStatus } = this.state;
        var product = {
            id : id,
            name : txtName,
            price : txtPrice,
            status : chkbStatus
        }
        if(id) {
            this.props.onUpdateProducts(product);
        }else {
            this.props.onAddProducts(product);
        }
        // history.goBack();
        history.push("/product-list");
    }
}

const mapStateToProps = state => {
    return {
        itemEditing : state.itemEditing
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddProducts: (product) => {
            dispatch(actAddProductsRequest(product));
        },
        onEditProducts: (id) => {
            dispatch(actGetProductsRequest(id));
        },
        onUpdateProducts: (product) => {
            dispatch(actUpdateProductsRequest(product));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);