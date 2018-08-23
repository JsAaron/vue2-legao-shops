<template>
  <div class="inventory-container">

    <!-- 搜索，过滤 -->
    <div class="inventory-filter">
      <el-form :model="listQuery">
        <el-row>
          <el-col :span="8">
            <el-form-item label="产品编号：">
              <el-input v-model="listQuery.code" clearable prefix-icon="el-icon-search" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="产品货号：">
              <el-input v-model="listQuery.storeid" clearable prefix-icon="el-icon-search" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
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
          <el-col :span="8">
            <el-form-item label="库存状态：">
              <el-select v-model="listQuery.flag" clearable>
                <el-option
                  v-for="(item,index) in inventoryStatus"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 查询 -->
          <el-form-item>
            <el-button type="primary" @click="getList">查询</el-button>
          </el-form-item>
        </el-row>

      </el-form>
    </div>

    <!-- 主体列表查询 -->
    <div class="inventory-list">
      <el-table
        v-loading="listLoading" 
        ref="multipleTable"
        :data="list"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          align="center"
          width="35">
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
          min-width="120"
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
          label="完整性">
          <template slot-scope="scope">
            {{transformProductStatus(scope.row.is_new)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="flag"
          align="center"
          label="库存状态">
          <template slot-scope="scope">
            {{transformInventoryStatus(scope.row.flag)}}
          </template>
        </el-table-column>
        <el-table-column 
          align="center" 
          label="操作"> 
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="clickManageUpdate(scope.row)">管理</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 确定按钮 -->
      <div class="checked-bt">
          <el-checkbox v-model="checkedAll" @change="toggleAllSelection(list)" class="all-checkbox">全选</el-checkbox>
          <el-button type="primary" @click="clickStockSelection()">进货确定</el-button>
          <el-button type="primary" @click="clickReturnSelection()">退回总部</el-button>
      </div>
    </div>

    <!-- 底部页码导航 -->
    <div class="inventory-pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5,10,20,50,100]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <!-- 管理更新 -->
    <common-dialog class="manage-dialog el-dialog-large" @close-self="manageDialogClose" :visible="manageDialogVisible" :title="manageDialogTitle">
      <template class="main" slot="main">
        <!-- 左图 -->
        <section><img src="../../images/common/logo.png"></section>
        <!-- 右表单 -->
        <el-form ref="manageDialogForm"  :model="manageDialogForm" >
          <el-form-item label="产品名称 :">{{manageDialogForm.name}}</el-form-item>
          <div class="between">
            <el-form-item label="产品货号 :">{{manageDialogForm.storeid}}</el-form-item>
            <el-form-item label="颗 粒 数 :">{{manageDialogForm.number}}</el-form-item>
          </div>
          <div class="between">
            <el-form-item label="押 金 价 :">{{manageDialogForm.price}}</el-form-item>
            <el-form-item label="进 货 价 :">{{manageDialogForm.origin_price}}</el-form-item>
          </div>
          <el-form-item label="库存状态 :">
            <el-select  v-model="manageDialogForm.flagValue" :placeholder="transformInventoryStatus(manageDialogForm.flag)">
              <el-option v-for="(item,index) in inventoryStatus" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="完 整 性 :">
            <el-select v-model="manageDialogForm.is_newValue" :placeholder="transformProductStatus(manageDialogForm.is_new)">
              <el-option v-for="(item,index) in productStatus" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="功能管理 :">
            <el-select v-model="manageDialogForm.extflagValue" :placeholder="transformExtStatus(manageDialogForm.extflag)">
              <el-option v-for="(item,index) in extStatus" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <template slot="footer">
        <el-button type="primary" @click="manageDialogClose">取消</el-button>
        <el-button type="primary" @click="manageDialogSave">确定</el-button>
      </template>
      <!-- 消息提示 -->
      <template>
        <el-button plain @click="openNotification"></el-button>
      </template>
    </common-dialog>

    <!-- 进货确定框 -->
    <common-dialog class="stock-dialog el-dialog-mini" @close-self="stockDialogClose" :visible="stockDialogVisible" :title="stockDialogTitle">
      <div class="title" slot="main">
        <p>共选择商品(件): 4</p>
        <p>总金额(元): 3453234</p>
      </div>
      <template slot="footer">
          <el-button type="primary" @click="stockDialogClose">取 消</el-button>
          <el-button type="primary" @click="stockDialogSave">确 定</el-button>
      </template>
    </common-dialog>

    <!-- 退回总部 -->
    <common-dialog class="sendBack-dialog" @close-self="sendBackDialogClose" :visible="sendBackDialogVisible"  :title="sendBackDialogTitle">
      <template class="main" slot="main">
        <el-table
        :data="sendBackList"
        tooltip-effect="dark">
        <el-table-column
          prop="productName"
          label="产品名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="productId"
          label="产品货号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="cashPledge"
          label="押金价"
          align="center">
        </el-table-column>
        <el-table-column
          prop="purchasePrice"
          align="center"
          label="进货价">
        </el-table-column>
        <el-table-column
          prop="productStatus"
          align="center"
          label="产品状态">
        </el-table-column>
        <el-table-column
          prop="integrity"
          align="center"
          label="完整性">
        </el-table-column>
        <el-table-column 
          align="center" 
          label="操作"> 
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="sendBackDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary"  @click="sendBackDialogClose">取 消</el-button>
        <el-button type="primary" @click="sendBackDialogSave">确 定</el-button>
      </span>
    </common-dialog>

  </div>
</template>

<script>
import { fetchList, updateInventory } from "@/api/inventory";
import CommonDialog from "@/views/common/dialog";
import {
  extStatus,
  productStatus,
  inventoryStatus,
  transformExtStatus,
  transformProductStatus,
  transformInventoryStatus
} from "@/utils";

export default {
  components: {
    CommonDialog
  },
  data() {
    return {
      //===================
      //  管理 更新
      //===================
      manageDialogTitle: "商品信息",
      manageDialogVisible: false,
      manageDialogForm: {},

      //===================
      //  进货确定
      //===================
      multipleSelection: [], //多选项内容
      stockDialogVisible: false,
      stockDialogTitle: "进货确定",

      //===================
      //  退回总部
      //===================
      checkedAll: false, //全选
      sendBackDialogVisible: false,
      sendBackDialogTitle: "归还清单",
      sendBackForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      sendBackList: [
        {
          productName: "张三",
          productId: "04-23-4-5-6-23-32",
          cashPledge: 1000,
          purchasePrice: 200,
          productStatus: "新品",
          integrity: "完整"
        }
      ],

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
      list: null, //数据列表
      total: null,
      listLoading: true, //加载进度条
      activeFlag: "", //动态改变的库存状态
      activeIs_new: "", //动态改变的完整性
      listQuery: {
        //列表查询条件
        pages: 1, //取第几个页面
        limit: 10 //多少条数据
      },
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
      ],
      //店铺名
      shopName: [
        {
          value: "选项1",
          label: "乐高实体店1"
        },
        {
          value: "选项2",
          label: "乐高实体店2"
        },
        {
          value: "选项3",
          label: "乐高实体店3"
        },
        {
          value: "选项4",
          label: "乐高实体店4"
        },
        {
          value: "选项5",
          label: "乐高实体店5"
        }
      ]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    transformExtStatus,
    transformProductStatus,
    transformInventoryStatus,
    //===================
    //  获取数据
    //===================
    getList() {
      this.listLoading = true; //每次重新获取，需要处理
      fetchList(this.listQuery).then(response => {
        this.list = [...response.data.data];
        this.total = Number(response.data.count);
        this.listLoading = false;
      });
    },

    //===================
    //  全选
    //===================
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (val.length === 0) {
        this.checkedAll = false;
      }
    },

    //===================
    //  管理按钮
    //===================
    clickManageUpdate(data) {
      this.activeData = data;
      this.manageDialogVisible = true;
      this.manageDialogForm = Object.assign({}, data, {
        flagValue: "", //库存值
        is_newtValue: "", //完整性
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

    manageDialogSave() {
      const query = {};

      this.getValue("flag", "flagValue", function(prop, value) {
        query[prop] = value;
      });

      this.getValue("is_new", "is_newValue", function(prop, value) {
        query[prop] = value;
      });

      this.getValue("extflag", "extflagValue", function(prop, value) {
        query[prop] = value;
      });

      if (!Object.keys(query).length) {
        this.openNotification("没有选择提交的数据!");
        return;
      }
      query["id"] = this.manageDialogForm.id;
      updateInventory(query).then(
        () => {
          if (query["flag"] || query["flag"] == 0) {
            this.activeData.flag = this.manageDialogForm["flagValue"];
          }
          if (query["is_new"] || query["is_new"] == 0) {
            this.activeData.is_new = this.manageDialogForm["is_newValue"];
          }
          this.openNotification("数据更新成功!", "success");
          setTimeout(() => {
            this.manageDialogClose();
          }, 1000);
        },
        () => {
          this.openNotification("数据更新失败!", "warning");
        }
      );
    },
    openNotification(message, type = "info") {
      const config = {
        duration: 1000,
        message,
        offset: 100
      };
      if (type === "success") {
        this.$notify(
          Object.assign(
            {
              type,
              title: "成功"
            },
            config
          )
        );
      }
      if (type === "info") {
        this.$notify.info(
          Object.assign(
            {
              title: "通知"
            },
            config
          )
        );
      }
      if (type === "warning") {
        this.$notify(
          Object.assign(
            {
              title: "警告",
              type: "warning"
            },
            config
          )
        );
      }
    },

    //===================
    //  进货确定关闭按钮
    //===================
    clickStockSelection() {
      if (this.multipleSelection.length) {
        this.stockDialogVisible = true;
      }
    },
    stockDialogClose() {
      this.stockDialogVisible = false;
    },
    stockDialogSave() {
      this.stockDialogClose();
    },

    //===================
    // 退回总部
    //===================
    toggleAllSelection(rows) {
      const multipleSelectionCount = this.multipleSelection.length;
      //默认情况
      if (multipleSelectionCount == 0) {
        this.$refs.multipleTable.toggleAllSelection();
        this.checkedAll = true;
      }
      if (multipleSelectionCount === this.list.length) {
        this.$refs.multipleTable.clearSelection();
        this.checkedAll = false;
      }
      //如果只选中几个的情况
      if (
        multipleSelectionCount > 0 &&
        multipleSelectionCount < this.list.length
      ) {
        this.$refs.multipleTable.toggleAllSelection();
        this.checkedAll = true;
      }
    },
    clickReturnSelection() {
      if (this.multipleSelection.length) {
        this.sendBackDialogVisible = true;
      }
    },
    sendBackDelete() {},
    sendBackDialogClose() {
      this.sendBackDialogVisible = false;
    },
    sendBackDialogSave() {
      this.sendBackDialogClose();
    },

    //===================
    //  底部页面
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

<style lang="scss" scoped>
.inventory-container {
  .inventory-filter {
    width: 90%;
    margin: 0 auto;
    .el-form-item {
      display: flex;
      font-weight: 800;
      height: 0.33rem;
    }
  }
  .inventory-list {
    width: 95%;
    margin: 0 auto;
    .checked-bt {
      font-size: 0;
      .all-checkbox {
        margin: 0.2rem 0.15rem;
      }
    }
  }
  .inventory-pagination {
    margin-top: 0.3rem;
    margin-right: 0.3rem;
    margin-bottom: 1rem;
    div {
      float: right;
    }
  }
}
</style>

<style lang="scss">
.inventory-container {
  .el-table__header th {
    background-color: #4b91cd;
    @include setFontColor(0.15rem, white);
  }
  .el-table__header th:nth-child(n + 3):before {
    content: "|";
    color: white;
  }
  //管理更新
  .manage-dialog {
    .el-dialog {
      .el-dialog__body {
        display: flex;
        padding-top: 0.3rem;
        align-items: center;
        img {
          @include setWH(2.92rem, 2.92rem);
        }
        .el-form {
          width: 4.6rem;
          height: 2.92rem;
          margin-left: 0.1rem;
          .between {
            display: flex;
          }
          .between div:first-child {
            width: 2.7rem;
          }
          .el-form-item {
            margin-bottom: 0.05rem;
            display: flex;
            align-items: center;
          }
          .el-form-item__label {
            width: 0.8rem;
            text-align: left;
          }
          .el-form-item__label,
          .el-form-item__content {
            line-height: 0.4rem;
            display: inline-block;
            font-weight: 600;
            font-size: 0.15rem;
            padding: 0;
          }
        }
      }
    }
  }
  //退回总部
  .sendBack-dialog {
    .el-dialog {
      @include setWH(14.5rem, 8.5rem);
      background: #ffffff;
      @include translateCenter;
      .el-dialog__header {
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


