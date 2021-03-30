import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class ProductItem extends Component {
    render() {
        var { product, index } = this.props;
        var statusName = product.status ? 'Còn Hàng' : 'Hết Hàng';
        var statusClass = product.status ? 'info' : 'danger';
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{this.loadPrice(product.price)} đ</td>
                <td className="text-center">
                    <span className={`label label-${statusClass}`}>
                        {statusName}
                    </span>

                </td>
                <td className="text-center">
                    <Link
                        to={`/products/${product.id}/edit`}
                        className="btn btn-success mr-10"

                    >
                        <span className="glyphicon glyphicon-cog mr-10"></span>Sửa
                    </Link>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => this.onDelete(product.id)}
                    >
                        <span className="glyphicon glyphicon-trash mr-10"></span>Xóa
                    </button>
                </td>
            </tr>
        );
    }

    loadPrice = (price) => {
        var result = '';
        if (price.length > 3) {
            var j = price.length;
            for (var i = price.length; i > 0; i--) {
                if (i === (j - 3)) {
                    result = `.` + result;
                    j = j - 3;
                }
                result = price[i - 1] + result;
            }
        } else result = price
        return result;
    }

    onDelete = (id) => {
        if (confirm('Bạn Chắc Chắn muốn xóa ?')) {//eslint-disable-line
            this.props.onDelete(id);
        }
    }

}

export default ProductItem;