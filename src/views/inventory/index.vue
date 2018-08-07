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
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-row>

      </el-form>
    </div>

    <!-- 主体列表查询 -->
    <div class="stock-list">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
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
      <div style="margin-top: 20px">
        <el-checkbox v-model="checked" class="all-checkbox">全选</el-checkbox>
        <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">进货确定</el-button>
        <el-button @click="toggleSelection()">退回总部</el-button>
      </div>
    </div>

    <!-- 底部页码导航 -->
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10,20,50,100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100">
      </el-pagination>
    </div>


  </div>
</template>

<script>
export default {
  data() {
    return {
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
      //数据列表
      tableData: [],
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
     * 获取数据列表
     */
    getList() {
      var temp = {
        id: 1,
        typeId: 345,
        cardType: "大王卡",
        name: "王小虎",
        poductId: "76849-01-01-02",
        productName:
          "喷气机：蝙蝠战车空运攻击喷气机：蝙蝠战车空运攻击喷气机：蝙蝠战车空运攻击",
        shopName: "喜盈门",
        integrity: "完整",
        inventory: "已借出"
      };
      for (var i = 1; i < 11; i++) {
        var data = Object.assign({}, temp);
        data.id = i;
        this.tableData.push(data);
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    onSubmit() {
      console.log(this.form);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.stock-container {
  .filter-container {
    width: 90%;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 20px;
    .el-form-item {
      display: flex;
      font-weight: 800;
      margin-bottom: 10px;
    }
  }
  .stock-list {
    width: 95%;
    margin: 0 auto;
    .all-checkbox {
      margin-right: 20px;
      margin-left: 14px;
    }
  }
  .pagination-container {
    margin-top: 20px;
    .el-pagination {
      width: 50%;
      float: right;
    }
  }
}
</style>

<style lang="scss">
.stock-container {
  .el-table__header th {
    background-color: rgb(48, 65, 86);
    @include setFontColor(0.9rem, white);
  }
  .el-table__header th:nth-child(n + 3):before {
    content: "|";
    color: white;
  }
}
</style>


