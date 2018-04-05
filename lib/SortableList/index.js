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

var _itemCache = require('./itemCache');

var _SortableItem = require('../SortableItem');

var _SortableItem2 = _interopRequireDefault(_SortableItem);

var _types = require('../types');

var _dragSpec = require('./dragSpec');

var dragSpec = _interopRequireWildcard(_dragSpec);

var _dropSpec = require('./dropSpec');

var dropSpec = _interopRequireWildcard(_dropSpec);

var _propTypes = require('./propTypes');

var propTypes = _interopRequireWildcard(_propTypes);

var _PureComponent2 = require('../PureComponent');

var _PureComponent3 = _interopRequireDefault(_PureComponent2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var identity = function identity(c) {
  return c;
};

var SortableList = function (_PureComponent) {
  (0, _inherits3.default)(SortableList, _PureComponent);

  function SortableList(props) {
    (0, _classCallCheck3.default)(this, SortableList);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SortableList.__proto__ || (0, _getPrototypeOf2.default)(SortableList)).call(this, props));

    _this.renderRow = _this.renderRow.bind(_this);
    _this.renderList = _this.renderList.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(SortableList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.connectDragPreview((0, _reactDndHtml5Backend.getEmptyImage)(), {
        captureDraggingState: true
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.list.rows !== this.props.list.rows && !!this._list) {
        this._list.recomputeRowHeights();
      }
    }
  }, {
    key: 'renderRow',
    value: function renderRow(row, index) {
      return _react2.default.createElement(_SortableItem2.default, {
        key: row.id,
        row: row,
        rowId: row.id,
        listId: this.props.listId,
        rowStyle: {},
        itemComponent: this.props.itemComponent,
        moveRow: this.props.moveRow,
        dropRow: this.props.dropRow,
        dragBeginRow: this.props.dragBeginRow,
        dragEndRow: this.props.dragEndRow,
        findItemIndex: this.props.findItemIndex,
        dndDisabled: this.props.dndDisabled
      });
    }
  }, {
    key: 'renderList',
    value: function renderList() {
      return this.props.list.rows.map(this.renderRow);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          list = _props.list,
          listId = _props.listId,
          DecoratedList = _props.listComponent,
          isDragging = _props.isDragging,
          connectDragSource = _props.connectDragSource,
          connectDropTarget = _props.connectDropTarget,
          listStyle = _props.listStyle;


      return _react2.default.createElement(
        DecoratedList,
        {
          list: list,
          listId: listId,
          rows: list.rows,
          listStyle: listStyle,
          isDragging: isDragging,
          connectDragSource: connectDragSource,
          connectDropTarget: connectDropTarget
        },
        this.renderList()
      );
    }
  }]);
  return SortableList;
}(_PureComponent3.default);

var connectDrop = (0, _reactDnd.DropTarget)([_types.LIST_TYPE, _types.ROW_TYPE], dropSpec, function (connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
});

var connectDrag = (0, _reactDnd.DragSource)(_types.LIST_TYPE, dragSpec, function (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
});

exports.default = connectDrop(connectDrag(SortableList));