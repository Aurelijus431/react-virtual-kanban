'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDnd = require('react-dnd');

var _reactDndHtml5Backend = require('react-dnd-html5-backend');

var _types = require('../types');

var _dragSpec = require('./dragSpec');

var dragSpec = _interopRequireWildcard(_dragSpec);

var _dropSpec = require('./dropSpec');

var dropSpec = _interopRequireWildcard(_dropSpec);

var _propTypes = require('./propTypes');

var propTypes = _interopRequireWildcard(_propTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SortableItem = function (_React$PureComponent) {
  (0, _inherits3.default)(SortableItem, _React$PureComponent);

  function SortableItem(props) {
    (0, _classCallCheck3.default)(this, SortableItem);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SortableItem.__proto__ || (0, _getPrototypeOf2.default)(SortableItem)).call(this, props));

    _this.recalculateRowHeights = _this.recalculateRowHeights.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(SortableItem, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.connectDragPreview((0, _reactDndHtml5Backend.getEmptyImage)(), {
        captureDraggingState: true
      });
    }
  }, {
    key: 'recalculateRowHeights',
    value: function recalculateRowHeights() {
      var _props = this.props,
          recalculateRowHeights = _props.recalculateRowHeights,
          rowIndex = _props.rowIndex;

      recalculateRowHeights(rowIndex);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          row = _props2.row,
          rowId = _props2.rowId,
          listId = _props2.listId,
          DecoratedItem = _props2.itemComponent,
          isDragging = _props2.isDragging,
          connectDragSource = _props2.connectDragSource,
          connectDropTarget = _props2.connectDropTarget;

      return _react2.default.createElement(DecoratedItem, {
        row: row,
        rowId: rowId,
        listId: listId,
        rowStyle: this.props.style,
        isDragging: isDragging,
        connectDragSource: connectDragSource,
        connectDropTarget: connectDropTarget,
        recalculateRowHeights: this.recalculateRowHeights
      });
    }
  }]);
  return SortableItem;
}(_react2.default.PureComponent);

var connectDrop = (0, _reactDnd.DropTarget)(_types.ROW_TYPE, dropSpec, function (connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
});

var connectDrag = (0, _reactDnd.DragSource)(_types.ROW_TYPE, dragSpec, function (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
});

exports.default = connectDrop(connectDrag(SortableItem));