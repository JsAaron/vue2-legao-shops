<template>
  <div class="stock-container">

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
    <div class="stock-list">
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
          label="产品货号"
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
          width="120" 
          label="操作"> 
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">管理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>


    <!-- 底部页码导航 -->
    <div class="pagination-container">

      <div class="checked-bt">
        <el-checkbox v-model="checked" @change="toggleSelection(list)" class="all-checkbox">全选</el-checkbox>
        <el-button type="primary" @click="replenishSelection()">进货确定</el-button>
        <el-button type="primary" @click="returnSelection()">退回总部</el-button>
      </div>

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

     <!-- 管理修改 -->
    <edit-modify  @close-dialog="closeDialog" :dialogVisible="dialogVisible"></edit-modify>

  </div>
</template>

<script>
import { fetchList } from "@/api/inventory";
import Button from "./button";
import EditModify from "./editModify";
export default {
  components: {
    Button,
    EditModify
  },
  data() {
    return {
      dialogVisible: false,
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
      checked: false,
      //分页数据
      pageDate: {}
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /**
     * 子组件改变dialog的装填
     */
    closeDialog() {
      this.dialogVisible = false;
    },
    /**
     * 点击管理
     */
    handleUpdate() {
      this.dialogVisible = true;
    },
    /**
     * 获取数据列表
     */
    getList() {
      this.listLoading = true; //每次重新获取，需要处理
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items;
        this.total = response.data.total;
        setTimeout(() => {
          this.listLoading = false;
        }, 200);
      });
    },
    /**
     * 改变每页显示的数量
     */
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    /**
     * 改变当前页码
     */
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    /**
     * 选择row
     */
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    /**
     * 进货确定
     */
    replenishSelection() {
      if (this.multipleSelection.length) {
        const list = this.multipleSelection;
      }
    },
    /**
     * 退回总部
     */
    returnSelection() {},
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     * 查询
     */
    onQuery() {
      console.log(this.form);
    }
  }
};
</script>

<style lang="scss" scoped>
.stock-container {
  .filter-container {
    width: 90%;
    margin: 0 auto;
    .el-form-item {
      display: flex;
      font-weight: 800;
      height: 0.33rem;
    }
  }
  .stock-list {
    width: 95%;
    margin: 0 auto;
  }
  .pagination-container {
    margin-top: 0.3rem;
    width: 100%;
    .checked-bt {
      font-size: 0;
      .all-checkbox {
        margin: 0 0.2rem 0 0.55rem;
      }
    }
    .el-pagination {
      width: 8rem;
      float: right;
    }
  }
}
</style>

<style lang="scss">
.stock-container {
  .el-table__header th {
    background-color: #4b91cd;
    @include setFontColor(0.15rem, white);
  }
  .el-table__header th:nth-child(n + 3):before {
    content: "|";
    color: white;
  }
}
</style>


