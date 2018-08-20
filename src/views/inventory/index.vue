<template>
  <div class="inventory-container">

    <!-- 搜索，过滤 -->
    <div class="filter-container">
      <el-form :model="form">
        <el-row>
          <el-col :span="8">
            <el-form-item label="产品编号：">
              <el-input v-model="form.id"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="产品货号：">
              <el-input v-model="form.poductId"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="所属卡：">
              <el-select v-model="form.cadrValue">
              <el-option
                v-for="type in cardType"
                :key="type.value"
                :label="type.label"
                :value="type.value">
              </el-option>
            </el-select>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="所属门店：">
              <el-select v-model="form.shopValue">
                <el-option
                  v-for="name in shopName"
                  :key="name.value"
                  :label="name.label"
                  :value="name.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="库存状态：">
              <el-select v-model="form.stockValue">
                <el-option
                  v-for="state in stockState"
                  :key="state.value"
                  :label="state.label"
                  :value="state.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <!-- 查询 -->
          <el-form-item>
            <el-button type="primary" @click="onQuery">查询</el-button>
          </el-form-item>
        </el-row>

      </el-form>
    </div>

    <!-- 主体列表查询 -->
    <div class="list-container">
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
          prop="id"
          label="产品编号"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          prop="typeId"
          label="颗粒数"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="cardType"
          label="所属卡"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="productName"
          label="产品名称"
          align="center"
          show-overflow-tooltip
          min-width="200">
        </el-table-column>
        <el-table-column
          prop="poductId"
          align="center"
          width="150"
          label="产品货号">
        </el-table-column>
        <el-table-column
          prop="shopName"
          align="center"
          width="100"
          label="所属门店">
        </el-table-column>
        <el-table-column
          prop="integrity"
          align="center"
          width="100"
          label="完整性">
        </el-table-column>
        <el-table-column
          prop="inventory"
          align="center"
          width="100"
          label="库存状态">
        </el-table-column>

        <el-table-column 
          align="center" 
          width="100" 
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
    <div class="pagination-container">
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
    <common-dialog class="manage-dialog el-dialog-middle" @close-self="manageDialogClose" :visible="manageDialogVisible" :title="manageDialogTitle">
      <template class="main" slot="main">
        <!-- 左图 -->
        <section><img src="../../images/common/logo.png"></section>
        <!-- 右表单 -->
        <el-form ref="manageDialogForm"  :model="manageDialogForm" >
          <el-form-item label="产品名称 :">气球气球气球</el-form-item>
          <div class="between">
            <el-form-item label="产品货号 :">22222-41-13</el-form-item>
            <el-form-item label="颗 粒 数 :">542</el-form-item>
          </div>
          <div class="between">
            <el-form-item label="押 金 价 :">951.00</el-form-item>
            <el-form-item label="进 货 价 :">844.00</el-form-item>
          </div>
          <el-form-item label="产品状态 :">
            <el-select v-model="manageDialogForm.region" placeholder="二手">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="完 整 性 :">
            <el-select v-model="manageDialogForm.region" placeholder="二手">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属门店 :">
            <el-select v-model="manageDialogForm.region" placeholder="长沙喜盈门范城">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="功能管理 :">
            <el-select v-model="manageDialogForm.region" placeholder="可租借">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <template slot="footer">
        <el-button type="primary" @click="manageDialogClose">取消</el-button>
        <el-button type="primary" @click="manageDialogSave">确定</el-button>
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
import { fetchList } from "@/api/inventory";
import CommonDialog from "@/views/common/dialog";
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
      manageDialogForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },

      //===================
      //  进货确定
      //===================
      stockDialogVisible: false,
      stockDialogTitle: "进货确定",

      //===================
      //  退回总部
      //===================
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
      // 数据列表
      //===================
      //数据列表
      list: null,
      total: null,
      //加载进度条
      listLoading: true,
      //列表查询条件
      listQuery: {
        page: 1, //取第几个页面
        limit: 10 //多少条数据
      },
      form: {
        id: "", //产品编号
        poductId: "", //产品货号
        cadrValue: "读库通用铂金卡",
        stockValue: "进货确定",
        shopValue: "长沙喜盈门范城店"
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
      ],
      //货状态
      stockState: [
        {
          value: "选项1",
          label: "进货确定"
        },
        {
          value: "选项2",
          label: "出货确定"
        }
      ],
      //多选项内容
      multipleSelection: [],
      //全选
      checkedAll: false,
      //分页数据
      pageDate: {}
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //===================
    //  获取数据
    //===================
    getList() {
      this.listLoading = true; //每次重新获取，需要处理
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items;
        this.total = response.data.total;
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
    clickManageUpdate() {
      this.manageDialogVisible = true;
    },
    manageDialogClose() {
      this.manageDialogVisible = false;
    },
    manageDialogSave() {},

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
      this.listQuery.page = val;
      this.getList();
    },

    //===================
    //  查询
    //===================
    onQuery() {
      console.log(this.form);
    }
  }
};
</script>

<style lang="scss" scoped>
.inventory-container {
  .filter-container {
    width: 90%;
    margin: 0 auto;
    .el-form-item {
      display: flex;
      font-weight: 800;
      height: 0.33rem;
    }
  }
  .list-container {
    width: 95%;
    margin: 0 auto;
    .checked-bt {
      font-size: 0;
      .all-checkbox {
        margin: 0.2rem 0.15rem;
      }
    }
  }
  .pagination-container {
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
      @include setWH(8.14rem, auto);
      .el-dialog__header {
        height: 0.62rem;
      }
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
  //进货确定
  .stock-dialog {
  }
  //退回总部
  .sendBack-dialog {
    .el-dialog {
      @include setWH(14.5rem, 8.5rem);
      @include borderRadius(0.2rem);
      margin-top: 0 !important;
      background: #ffffff;
      @include setCenter;
      .el-dialog__header {
        height: 1rem;
        position: relative;
        .el-dialog__title {
          @include setCenter;
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


