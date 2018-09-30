<template>
  <div class="statistics-container">

    <h3>销售数据统计（元）</h3>
    <div class="line"></div>
    <div class="statistics-list">
      <!-- 列表数据 -->
      <div class="legao-list">
          <el-table
            :data="salesData"
            tooltip-effect="dark">
            <el-table-column
              prop="name"
              align="center">
            </el-table-column>
            <el-table-column
              prop="7p"
              label="7日销售额"
              width="150"
              align="center">
            </el-table-column>
            <el-table-column
              prop="30p"
              label="30日销售额"
              width="150"
              align="center">
            </el-table-column>
            <el-table-column
              prop="360p"
              label="年销售额"
              width="150"
              align="center">
            </el-table-column>
          </el-table>
      </div>
    </div>

    <h3>会员卡销量统计（张）</h3>
    <div class="line"></div>
    <div class="statistics-list">
      <!-- 列表数据 -->
      <div class="legao-list">
          <el-table
            :data="cardData"
            tooltip-effect="dark">
            <el-table-column
              prop="name"
              align="center">
            </el-table-column>
            <el-table-column
              prop="7p"
              label="7天销量"
              width="150"
              align="center">
            </el-table-column>
            <el-table-column
              prop="30p"
              label="30天销量"
              width="150"
              align="center">
            </el-table-column>
            <el-table-column
              prop="360p"
              label="总销量"
              width="150"
              align="center">
            </el-table-column>
          </el-table>
      </div>
    </div>

    <h3>店铺库存状态统计（件）</h3>
    <div class="line"></div>
    <div class="statistics-text">
      <el-row :gutter="20">
        <el-col :span="6">
          <label>店铺玩:</label><span>80</span>
        </el-col>
        <el-col :span="6">
          <label>店铺展示:</label><span>80</span>
        </el-col>
        <el-col :span="6">
          <label>店铺可租借:</label><span>80</span>
        </el-col>
        <el-col :span="6">
          <label>借出在外:</label><span>80</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <label>会员借出已还:</label><span>80</span>
        </el-col>
        <el-col :span="6">
          <label>待清点分拣:</label><span>80</span>
        </el-col>
        <el-col :span="6">
          <label>清点分拣中:</label><span>80</span>
        </el-col>
        <el-col :span="6">
          <label>店铺归还总部:</label><span>80</span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      salesData: [
        { name: "交易金额", "7p": 11111, "30p": 11111, "360p": 11111 },
        { name: "押金金额", "7p": 33333, "30p": 11111, "360p": 11111 }
      ],
      cardData: [
        { name: "月卡", "7p": 1, "30p": 1, "360p": 1 },
        { name: "月卡1", "7p": 1, "30p": 1, "360p": 1 },
        { name: "月卡2", "7p": 1, "30p": 1, "360p": 1 },
        { name: "月卡3", "7p": 1, "30p": 1, "360p": 1 },
        { name: "月卡4", "7p": 1, "30p": 1, "360p": 1 },
        { name: "月卡7", "7p": 1, "30p": 1, "360p": 1 }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.statistics-container {
  > h3 {
    margin-top: 0.3rem;
    font-size: 0.24rem;
  }
  padding-left: 2rem;
  .line {
    margin: 0.2rem 0;
    width: 0.49rem;
    height: 0.07rem;
    background-color: #efb526;
  }
  .statistics-list {
    width: 8.39rem;
    .legao-list {
      width: 100%;
    }
  }
  .statistics-text {
    margin-top: 0.3rem;
    width: 10rem;
    .el-row {
      margin-top: 0.2rem;
    }
    label,
    span {
      font-size: 0.18rem;
    }
  }
}
</style>
