<script setup>
import { ref  } from 'vue'
import 'element-plus/theme-chalk/el-message.css'
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/userStore";
const router = useRouter()
// form object
const userInfo = ref({
  account : "itHuaan ",
  mobile : '15300001111',
  password : "123456",
  code : '123456',
  agree : true
})
const rules = {
  account: [
    { required: true, message: '用户名不能为空' }
  ],
  mobile : [
    {required : true , message : '手机号不能为空'},
    {min : 11 , message : "手机号长度为11位"}

  ],
  password: [
    { required: true, message: '密码不能为空' },
    { min: 6, max: 24, message: '密码长度要求6-14个字符' }
  ],
  code : [
    {required : true , message : '验证码不能为空'}
  ],
  agree: [
    {
      validator: (rule, val, callback) => {
        return val ? callback() : new Error('请先同意协议')
      }
    }
  ]
}
const userStore = useUserStore()
const formRef = ref(null)
// get code
const getcode = async () => {
  const res = await userStore.getCode({
    mobile : userInfo.value
  })
  userInfo.value.code = res.result.code
}
const doRegister = () => {
  const {account , mobile , password , code} = userInfo.value
  formRef.value.validate(async (valid) => {
    if (valid) {
      await  userStore.getRegisterInfo({
        account : account,
        mobile : mobile,
        password : password,
        code : code
      })
      // 1. 提示用户
      ElMessage({ type: 'success', message: '注册成功' })
      // 2. 跳转首页
      await router.replace({path: "/login"})
    }
  })
}

</script>


<template>
  <div>
    <header class="login-header">
      <div class="container m-top-20">
        <h1 class="logo">
          <RouterLink to="/">itHuaan</RouterLink>
        </h1>
        <RouterLink class="entry" to="/">
          进入网站首页
          <i class="iconfont icon-angle-right"></i>
          <i class="iconfont icon-angle-right"></i>
        </RouterLink>
      </div>
    </header>
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;">账户注册</a>
        </nav>
        <div class="account-box">
          <div class="form"  >
            <el-form ref="formRef" label-position="right" label-width="60px"
                     status-icon :model="userInfo" :rules="rules">
              <el-form-item  label="账户" prop="account" label-width="70px">
                <el-input v-model="userInfo.account"/>
              </el-form-item>
              <el-form-item  label="手机号" prop="mobile" label-width="70px">
                <el-input v-model="userInfo.mobile"/>
              </el-form-item>

              <el-form-item label="密码" prop="password" label-width="70px">
                <el-input v-model="userInfo.password" type="password"/>
              </el-form-item>
              <el-form-item label="验证码" prop="code" label-width="70px">
                <el-input v-model="userInfo.code" input-style="width : 120px"/>
                <span ><el-button type="primary" size="small" style="margin-left: 50px" @click="getcode">获取验证码</el-button></span>
              </el-form-item>

              <el-form-item label-width="22px" prop="agree">
                <el-checkbox  size="large" v-model="userInfo.agree">
                  我已同意隐私条款和服务条款
                </el-checkbox>
              </el-form-item>
              <el-button size="large" class="subBtn" @click="doRegister">点击注册</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </section>

    <footer class="login-footer">
      <div class="container">
        <p>
          <a href="https://hua123an.github.io">点击进去工具页</a>
        </p>
        <p>CopyRight &copy; itHuaan</p>
      </div>
    </footer>
  </div>
</template>

<style scoped lang='scss'>
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;

  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url("@/assets/images/logo.jpg") no-repeat center 18px / contain;
    }
  }

  .sub {
    flex: 1;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 38px;
    margin-left: 20px;
    color: #666;
  }

  .entry {
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;

    i {
      font-size: 14px;
      color: $xtxColor;
      letter-spacing: -5px;
    }
  }
}

.login-section {
  background: url('@/assets/images/login-bg.png') no-repeat center / cover;
  height: 488px;
  position: relative;

  .wrapper {
    width: 380px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
      }
    }
  }
}

.login-footer {
  padding: 30px 0 50px;
  background: #fff;

  p {
    text-align: center;
    color: #999;
    padding-top: 20px;

    a {
      line-height: 1;
      padding: 0 10px;
      color: #999;
      display: inline-block;

      ~a {
        border-left: 1px solid #ccc;
      }
    }
  }
}

.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: $xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 20px 20px 20px;


    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        >i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: $priceColor;
          }

          &.active,
          &:focus {
            border-color: $xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      >.error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: $priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: $xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}

.subBtn {
  background: $xtxColor;
  width: 100%;
  color: #fff;
}

</style>