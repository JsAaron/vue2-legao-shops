<template>
  <div class="inventory-container">

    <!-- 搜索，过滤 -->
    <div class="legao-filter">
      <el-form size="small" :model="listQuery">
        <el-row>
          <el-col :xs="10" :sm="12" :lg="7">
            <el-form-item label="产品编号：">
              <el-input v-model="listQuery.code" clearable prefix-icon="el-icon-search" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="10" :sm="12" :lg="7">
            <el-form-item label="产品货号：">
              <el-input v-model="listQuery.storeid" clearable prefix-icon="el-icon-search" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="10" :sm="11" :lg="7">
            <el-form-item label="所属卡：">
                  <el-select v-model="listQuery.card" clearable>
                  <el-option
                    v-for="type in cardType"
                    :key="type.value"
                    :label="type.label"
                    :value="type.value">
                  </el-option>
                </el-select>
                </el-form-item>
          </el-col>
          <el-col :xs="10" :sm="10" :lg="7">
            <el-form-item label="库存状态：">
              <el-cascader
                clearable
                separator="-"
                :options="inventoryStatus"
                expand-trigger="hover"
                v-model="listQuery.inventory">
              </el-cascader>
            </el-form-item>
          </el-col>
          <!-- 查询 -->
          <el-form-item>
            <el-button type="primary" @click="filterReset">重置</el-button>
            <el-button type="primary" @click="getList">开始查询</el-button>
          </el-form-item>
        </el-row>

      </el-form>
    </div>

    <!-- 主体列表查询 -->
    <div class="legao-list">
      <el-table
        v-loading="listLoading" 
        ref="multipleTable"
        :data="listData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          align="center"
          width="45">
        </el-table-column>
        <el-table-column
          prop="code"
          label="产品编号"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          prop="number"
          label="颗粒数"
          align="center">
        </el-table-column>
        <el-table-column
          prop="cardname"
          label="所属卡"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="产品名称"
          min-width="200"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="storeid"
          align="center"
          min-width="140"
          label="产品货号">
        </el-table-column>
        <el-table-column
          prop="shopname"
          align="center"
          label="所属门店">
        </el-table-column>
        <el-table-column
          prop="is_new"
          align="center"
          label="产品完整">
          <template slot-scope="scope">
            {{transformProductStatus(scope.row.is_new)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="flag"
          align="center"
          min-width="120"
          label="库存状态">
          <template slot-scope="scope">
            {{transformInventoryStatus(scope.row.flag,scope.row.extflag)}}
          </template>
        </el-table-column>
        <el-table-column 
          align="center" 
          label="操作"> 
          <template slot-scope="scope">
            <el-button v-if="scope.row.flag==1" type="primary" size="mini" @click="manageDialogButton(scope.row)">管理</el-button>
            <el-button v-if="scope.row.flag==2" type="primary" size="mini" @click="productDialogButton(scope.row)">收货</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 确定按钮 -->
      <div class="all-selection" >
          <el-checkbox v-model="checkedAll" v-if="allSelectionVisible" @change="toggleAllSelection()" class="all-checkbox">全选</el-checkbox>
          <el-button type="primary" v-if="stockSelectionVisible" @click="stockDialogButton()">确认收货</el-button>
          <el-button type="primary" v-if="returnSelectionVisible" @click="returnDialogButton()">退回总部</el-button>
      </div>
    </div>

    <!-- 底部页码导航 -->
    <div class="legao-pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5,10,20,50,100]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listTotal">
      </el-pagination>
    </div>

    <!-- 管理弹框 -->
    <common-dialog class="manage-dialog el-dialog-large" @close-self="manageDialogClose" :visible="manageDialogVisible" :title="manageDialogTitle">
      <template class="main" slot="main">
        <!-- 左图 -->
        <section><img src="../../images/common/logo.png"></section>
        <!-- 右表单 -->
        <el-form ref="manageDialogForm"  :model="manageDialogForm" >
          <el-form-item class="productName">
              <template slot="label">
                <span>产品名称</span>
                <span>:</span>
              </template>
            {{manageDialogForm.name}}
          </el-form-item>
          <div class="inline">
            <el-form-item>
              <template slot="label">
                <span>产品货号</span>
                <span>:</span>
              </template>
              {{manageDialogForm.storeid}}
            </el-form-item>
            <el-form-item >
              <template slot="label">
                <span>颗粒数</span>
                <span>:</span>
              </template>
              {{manageDialogForm.number}}
              </el-form-item>
          </div>
          <div class="inline">
            <el-form-item>
              <template slot="label">
                <span>押金价</span>
                <span>:</span>
              </template>
              {{manageDialogForm.price}}
            </el-form-item>
            <el-form-item>
              <template slot="label">
                <span>进货价</span>
                <span>:</span>
              </template>
              {{manageDialogForm.origin_price}}
            </el-form-item>
          </div>
          <el-form-item>
            <template slot="label">
              <span>产品完整性</span>
              <span>:</span>
            </template>
            <el-input
              :placeholder="transformProductStatus(manageDialogForm.is_new)"
              :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item>
            <template slot="label">
              <span>包装完整性</span>
              <span>:</span>
            </template>
            <el-input
              :placeholder="transformProductStatus(manageDialogForm.flag)"
              :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item>
            <template slot="label">
              <span>功能管理</span>
              <span>:</span>
            </template>
            <el-select v-model="manageDialogForm.extflagValue" :placeholder="transformExtStatus(manageDialogForm.extflag)">
              <el-option v-for="(item,index) in extStatus" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <template slot="footer">
        <el-button type="primary" @click="manageDialogClose">取消</el-button>
        <el-button type="primary" @click="manageDialogUpdate">确定</el-button>
      </template>
    </common-dialog>

    <!-- 收货弹框 -->
    <common-dialog class="product-dialog el-dialog-large" @close-self="productDialogClose" :visible="productDialogVisible" :title="productDialogTitle">
      <template class="main" slot="main">
        <div class="product-top">
          <!-- 左图 -->
          <section><img src="../../images/common/logo.png"></section>
          <!-- 右表单 -->
          <el-form ref="productDialogForm"  :model="productDialogForm" >
            <el-form-item >
              <template slot="label">
                <span>产品名称</span>
                <span>:</span>
              </template>
              {{productDialogForm.name}}
            </el-form-item>
            <el-form-item>
              <template slot="label">
                <span>产品货号</span>
                <span>:</span>
              </template>
              {{productDialogForm.storeid}}
            </el-form-item>
            <el-form-item>
              <template slot="label">
                <span>押金价</span>
                <span>:</span>
              </template>
              {{productDialogForm.price}}
            </el-form-item>
            <el-form-item>
              <template slot="label">
                <span>所属卡</span>
                <span>:</span>
              </template>
              {{productDialogForm.cardname}}
            </el-form-item>
            <el-form-item>
              <template slot="label">
                <span>颗粒数</span>
                <span>:</span>
              </template>
              {{productDialogForm.number}}
            </el-form-item>
            <el-form-item>
              <template slot="label">
                <span>进货价</span>
                <span>:</span>
              </template>
              {{productDialogForm.origin_price}}
            </el-form-item>
          </el-form>
        </div>
        <div class="product-bottom">
          <p>备注：</p>
          <el-input type="textarea" v-model="productFormTextarea"></el-input>
          <p><el-checkbox v-model="productFormChecked" @change="productFormChange">收纳盒损坏</el-checkbox></p>
        </div>
      </template>
      <div>1111</div>
      <template slot="footer">
        <el-button type="primary" @click="productDialogClose">取消</el-button>
        <el-button type="primary" @click="productDialogUpdate">确定</el-button>
      </template>
    </common-dialog>

    <!-- 确认收货 -->
    <common-dialog class="stock-dialog el-dialog-mini" @close-self="stockDialogClose" :visible="stockDialogVisible" :title="stockDialogTitle">
      <div class="title" slot="main">
        <p>共选择商品(件): {{multipleSelectionItems.length}}</p>
        <p>总金额(元): {{stockDialogMoney}}</p>
      </div>
      <template slot="footer">
          <el-button type="primary" @click="stockDialogClose">取 消</el-button>
          <el-button type="primary" @click="stockDialogUpdate">确 定</el-button>
      </template>
    </common-dialog>

    <!-- 退回总部 -->
    <common-dialog class="return-dialog legao-list" @close-self="returnDialogClose" :visible="returnDialogVisible"  :title="returnDialogTitle">
      <template class="main" slot="main">
        <el-table
        :data="sendBackListData"
        tooltip-effect="dark">
        <el-table-column
          prop="name"
          label="产品名称"
          min-width="140"
          align="center">
        </el-table-column>
        <el-table-column
          prop="storeid"
          label="产品货号"
          min-width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="price"
          label="押金价"
          align="center">
        </el-table-column>
        <el-table-column
          prop="origin_price"
          align="center"
          label="进货价">
        </el-table-column>
        <el-table-column
          align="center"
          min-width="100"
          label="产品状态">
          <template slot-scope="scope">
            {{transformInventoryStatus(scope.row.flag,scope.row.extflag)}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="完整性">
          <template slot-scope="scope">
            {{transformProductStatus(scope.row.is_new)}}
          </template>
        </el-table-column>
        <el-table-column 
          align="center" 
          label="操作"> 
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="returnSubListDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <p class="send-info">
        <span>总件数：{{sendBackListData.length}}</span>
        <span>总金额：{{sendBackDialogMoney}}</span>
      </p>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary"  @click="returnDialogClose">取消</el-button>
        <el-button type="primary"  @click="returnDialogUpdate">确定归还</el-button>
      </span>
    </common-dialog>

  </div>
</template>

<script>
import {
  fetchList,
  acceptGoods,
  modifyExtflag,
  acceptGoodsBatch,
  remandGoodsBatch
} from "@/api/inventory";
import CommonDialog from "@/views/common/dialog";
import { Message } from "element-ui";
import {
  extStatus,
  productStatus,
  inventoryStatus,
  transformExtStatus,
  transformProductStatus,
  transformInventoryStatus
} from "@/utils/status";

/**
 * 默认查询条件
 */
const defaultQuery = {
  code: "",
  storeid: "",
  pages: 1, //取第几个页面
  limit: 10, //多少条数据
  flag: "", //库存搜索
  extflag: "", //库存搜索
  inventory: []
};

export default {
  components: {
    CommonDialog
  },
  data() {
    return {
      //===================
      //  管理弹框
      //===================
      manageDialogTitle: "商品信息",
      manageDialogVisible: false,
      manageDialogForm: {},

      //===================
      //  收货弹框
      //===================
      productDialogTitle: "收货管理",
      productDialogVisible: false,
      productFormTextarea: "",
      productFormChecked: false,
      productDialogForm: {},

      //===================
      //  底部进货确定
      //===================
      allSelectionVisible: false, //全选状态
      returnSelectionVisible: false, //退回
      stockSelectionVisible: false, //收货
      multipleSelectionItems: [], //多选项内容
      stockDialogVisible: false,
      stockDialogMoney: 0, //总金额
      stockDialogTitle: "收货确定",

      //===================
      // 底部退回总部
      //===================
      checkedAll: false, //全选
      returnDialogVisible: false,
      returnDialogTitle: "归还清单",
      sendBackListData: [],

      //===================
      // 数据查询/过滤
      //===================
      inventoryStatus, //库存状态
      productStatus, //完整性
      extStatus, //扩展状态
      activeData: null, //激活的当前数据

      //===================
      // 数据列表
      //===================
      listData: null, //数据列表
      listTotal: null,
      listLoading: true, //加载进度条
      activeFlag: "", //动态改变的库存状态
      activeIs_new: "", //动态改变的完整性
      listQuery: Object.assign({}, defaultQuery),
      //所属卡
      cardType: [
        {
          value: "选项1",
          label: "铂金卡1"
        },
        {
          value: "选项2",
          label: "铂金卡2"
        },
        {
          value: "选项3",
          label: "铂金卡3"
        },
        {
          value: "选项4",
          label: "铂金卡4"
        },
        {
          value: "选项5",
          label: "铂金卡5"
        }
      ]
    };
  },
  created() {
    this.getList();
  },

  computed: {
    //返回总部，金额动态计算
    sendBackDialogMoney() {
      return this.sendBackListData.reduce((prev, cur) => {
        return Number(cur.origin_price) + prev;
      }, 0);
    }
  },

  methods: {
    transformExtStatus,
    transformProductStatus,
    transformInventoryStatus,
    //===================
    //  公共方法
    //===================

    /**
     * 获取数据
     */
    getList() {
      this.listLoading = true; //每次重新获取，需要处理
      //查询，库存状态
      if (this.listQuery.inventory && this.listQuery.inventory.length) {
        this.listQuery.flag = this.listQuery.inventory[0];
        this.listQuery.extflag = this.listQuery.inventory[1];
      }
      fetchList(this.listQuery).then(response => {
        this.listData = [...response.data.data];
        this.listTotal = Number(response.data.count);
        switch (this.listQuery.flag) {
          case 1: //返回
            this.allSelectionVisible = true;
            this.returnSelectionVisible = true;
            this.stockSelectionVisible = false;
            break;
          case 2: //收货
            this.allSelectionVisible = true;
            this.stockSelectionVisible = true;
            this.returnSelectionVisible = false;
            break;
          default:
            this.allSelectionVisible = false;
            this.stockSelectionVisible = false;
            this.returnSelectionVisible = false;
        }
        this.listLoading = false;
      });
    },

    /**
     * 搜索复位
     */
    filterReset() {
      this.listQuery = Object.assign({}, defaultQuery);
      this.getList();
    },

    /**
     * 删除总列表数据
     * 对比storeid
     * 对应减少页码
     */
    updateListData({ list, storeid, callback, updatePage }) {
      //找到对应的storeid,删除list,如果提供回调
      for (var i = 0; i < list.length; i++) {
        if (list[i]["storeid"] === storeid) {
          list.splice(i, 1);
          //更新总页码
          if (updatePage) {
            --this.listTotal;
          }
          if (callback) {
            callback();
          }
        }
      }
    },

    //===================
    //  列表：全选
    //===================
    handleSelectionChange(val) {
      this.multipleSelectionItems = val;
      if (val.length === 0) {
        this.checkedAll = false;
      }
    },

    //===================
    // 列表右
    //  收货按钮
    //===================
    productDialogButton(data) {
      this.productDialogVisible = true;
      this.productDialogForm = Object.assign({}, data);
    },
    productDialogClose() {
      this.productFormTextarea = "";
      this.productFormChecked = false;
      this.productDialogVisible = false;
    },
    productFormChange() {
      if (this.productFormChecked) {
        this.productFormTextarea = "收纳盒损坏";
      } else {
        this.productFormTextarea = "";
      }
    },
    /**
     * 点击收货更新
     */
    productDialogUpdate() {
      acceptGoods({
        desc: this.productFormTextarea,
        storeid: this.productDialogForm.storeid
      }).then(
        req => {
          Message({
            message: "数据更新成功!",
            type: "success",
            duration: 1000
          });
          this.updateListData({
            list: this.listData,
            storeid: this.productDialogForm.storeid,
            updatePage: true
          });
          setTimeout(() => {
            this.productDialogClose();
          }, 1000);
        },
        () => {
          Message({
            message: "数据修改失败!",
            type: "error",
            duration: 2000
          });
        }
      );
    },

    //===================
    //  列表右
    //   管理按钮
    //===================
    manageDialogButton(data) {
      this.activeData = data;
      this.manageDialogVisible = true;
      this.manageDialogForm = Object.assign({}, data, {
        extflagValue: "" //额外功能
      });
    },
    manageDialogClose() {
      this.manageDialogVisible = false;
    },
    //必须是修改了数据，并且是有效值
    //0的数据,判断复杂
    getValue(original, setOriginal, fn) {
      let setOriginalValue = this.manageDialogForm[setOriginal];
      if (setOriginalValue || setOriginalValue === 0) {
        if (setOriginalValue != this.activeData[original]) {
          fn(original, setOriginalValue);
        }
      }
    },
    manageDialogUpdate() {
      let query = {};
      this.getValue("extflag", "extflagValue", function(prop, value) {
        query["new" + prop] = value;
      });
      if (!Object.keys(query).length) {
        Message({
          message: "没有修改数据!",
          type: "warning",
          duration: 1000
        });
        return;
      }
      query.storeid = this.manageDialogForm.storeid;
      query.extflag = this.manageDialogForm.extflag;
      modifyExtflag(query).then(
        req => {
          this.activeData.extflag = query["newextflag"];
          Message({
            message: "数据更新成功!",
            type: "success",
            duration: 1000
          });
          setTimeout(() => {
            this.manageDialogClose();
          }, 1000);
        },
        () => {
          Message({
            message: "数据修改失败!",
            type: "error",
            duration: 2000
          });
        }
      );
    },

    //===================
    //  底部多选：
    //===================
    toggleAllSelection() {
      const multipleSelectionCount = this.multipleSelectionItems.length;
      // //默认情况
      if (multipleSelectionCount == 0) {
        this.$refs.multipleTable.toggleAllSelection();
        this.checkedAll = true;
      }
      if (multipleSelectionCount === this.listData.length) {
        this.$refs.multipleTable.clearSelection();
        this.checkedAll = false;
      }
      //如果只选中几个的情况
      if (
        multipleSelectionCount > 0 &&
        multipleSelectionCount < this.listData.length
      ) {
        this.$refs.multipleTable.toggleAllSelection();
        this.checkedAll = true;
      }
    },

    //===================
    //  底部:确定收货
    //===================
    stockDialogButton() {
      if (this.multipleSelectionItems.length) {
        this.stockDialogVisible = true;
        this.stockDialogMoney = this.multipleSelectionItems.reduce(
          (prev, cur) => {
            return Number(cur.origin_price) + prev;
          },
          0
        );
      }
    },
    stockDialogClose() {
      this.stockDialogVisible = false;
    },
    stockDialogUpdate() {
      const storeids = this.multipleSelectionItems.map(item => {
        return item.storeid;
      });
      acceptGoodsBatch({
        storeid: storeids.join(",")
      }).then(
        req => {
          const error = [];
          req.data.map(item => {
            const storeid = item.storeid;
            //数据正常,删除
            if (item.state === "ok") {
              this.updateListData({
                list: this.listData,
                storeid,
                updatePage: true
              });
            } else {
              //删除出错
              error.push(storeid);
            }
          });
          if (error.length) {
            Message({
              message: "部分数据修改失败,请重新操作!",
              type: "info",
              duration: 1000
            });
            setTimeout(() => {
              this.stockDialogClose();
            }, 3000);
          } else {
            Message({
              message: "数据更新成功!",
              type: "success",
              duration: 1000
            });
            setTimeout(() => {
              this.stockDialogClose();
            }, 1000);
          }
        },
        () => {
          Message({
            message: "数据修改失败!",
            type: "error",
            duration: 2000
          });
        }
      );
    },

    //===================
    // 底部多选
    //    退回总部
    //==================
    //触发入口
    returnDialogButton() {
      if (this.multipleSelectionItems.length) {
        this.returnDialogVisible = true;
        this.sendBackListData = [...this.multipleSelectionItems];
      }
    },
    //子菜单列表删除
    returnSubListDelete(row) {
      for (var i = 0; i < this.sendBackListData.length; i++) {
        if (this.sendBackListData[i]["storeid"] === row.storeid) {
          this.sendBackListData.splice(i, 1);
        }
      }
    },
    //子菜单关闭
    returnDialogClose() {
      this.returnDialogVisible = false;
    },
    //批量列表删除确定
    returnDialogUpdate() {
      const storeids = this.sendBackListData.map(item => {
        return item.storeid;
      });
      remandGoodsBatch({
        storeid: storeids.join(",")
      }).then(
        req => {
          const error = [];
          req.data.map(item => {
            const storeid = item.storeid;
            //数据正常,删除
            if (item.state === "ok") {
              this.updateListData({
                list: this.sendBackListData,
                storeid,
                callback: () => {
                  this.updateListData({
                    list: this.listData,
                    storeid,
                    updatePage: true
                  });
                }
              });
            } else {
              //删除出错
              error.push(storeid);
            }
          });
          if (error.length) {
            Message({
              message: "部分数据修改失败,请重新操作!",
              type: "info",
              duration: 1000
            });
            setTimeout(() => {
              this.returnDialogClose();
            }, 3000);
          } else {
            Message({
              message: "数据更新成功!",
              type: "success",
              duration: 1000
            });
            setTimeout(() => {
              this.returnDialogClose();
            }, 1000);
          }
        },
        () => {
          Message({
            message: "数据修改失败!",
            type: "error",
            duration: 2000
          });
        }
      );
    },

    //===================
    //  底部页码
    //===================
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pages = val;
      this.getList();
    }
  }
};
</script>

<style lang="scss">
.inventory-container {
  .legao-list {
    .all-selection {
      font-size: 0;
      .all-checkbox {
        margin: 0.2rem 0.15rem;
      }
    }
  }
  .el-table__header th:nth-child(n + 3):before {
    content: "|";
    color: white;
  }
  //管理更新
  .manage-dialog,
  .product-dialog {
    .el-dialog {
      .el-dialog__body {
        display: flex;
        padding-top: 0.3rem;
        align-items: center;
        img {
          @include setWH(2.92rem, 2.92rem);
        }
        .el-form {
          width: 4.5rem;
          height: 2.92rem;
          margin-left: 0.3rem;
          .inline {
            display: flex;
          }
          & div:first-child {
            width: 2.7rem;
            &.productName {
              width: 100%;
            }
          }
          .el-form-item {
            margin-bottom: 0.05rem;
            display: flex;
            align-items: center;
          }
          .el-form-item__label {
            width: 0.9rem;
            display: flex !important;
            justify-content: flex-end;
            margin-right: 0.1rem;
            & span:last-child {
              margin-left: 0.05rem;
            }
          }
          .el-form-item__content {
            @include ellipsis;
          }
          .el-form-item__label,
          .el-form-item__content {
            // white-space: nowrap;
            line-height: 0.4rem;
            display: inline-block;
            // font-weight: 600;
            font-size: 0.18rem;
            padding: 0;
          }
        }
      }
    }
  }
  //收货
  .product-dialog {
    .el-dialog__body {
      flex-direction: column;
    }
    .product-top {
      display: flex;
      .el-form {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .el-form-item__label {
        }
      }

      .el-form-item {
        width: 100% !important;
      }
    }
    .product-bottom {
      margin: 0.1rem;
      width: 100%;
      p {
        margin: 0.1rem;
      }
    }
  }
  //退回总部
  .return-dialog {
    .el-dialog {
      @include setWH(14.5rem, auto);
      padding-top: 0.3rem;
      padding-bottom: 0.3rem;
      background: #ffffff;
      @include translateCenter;
      .el-dialog__header {
        background: #fff !important;
        position: relative;
        .el-dialog__title {
          @include translateCenter;
          color: #111111;
        }
        .el-dialog__title,
        .el-dialog__close {
          font-size: 0.3rem;
        }
      }
      .send-info {
        text-align: center;
        span {
          display: inline-block;
          margin: 0.1rem 0.5rem;
        }
      }
      .el-dialog__footer {
        width: 60%;
        margin: 0 auto;
        text-align: center;
      }
    }
    .el-table__header th:nth-child(n + 2):before {
      content: "|";
    }
  }
}
</style>


