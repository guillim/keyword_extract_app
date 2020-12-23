<template>
  <v-layout>
    <div v-if="isAuthorised">
      <h1>You are already logged in</h1>

      <v-btn
        href="/"
        color="primary"
      >Home</v-btn>

      <v-btn
        color="primary"
        type="submit"
        @click="removeAuthorisation()"
      >Log out</v-btn>

    </div>
    <div v-else>
      <h1>Premium access: password required</h1>
      <p>Please enter your password, or contact us to get one:  contact@dontgomanual.com</p>

      <v-form
        @submit="loginUser()">
        <v-row>
          <v-col
            cols="5"
            md="4"
          >
            <v-text-field
              v-model="methodLoginValue"
              :append-icon="value ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (value = !value)"
              :type="value ? 'text' : 'password'"
              name="pwd"
              min="15"
              hint="At least 15 characters"
              label="Enter your password"
              required
            />
          </v-col>
          <v-col
            cols="5"
            md="4"
          >
            <v-btn
              color="primary"
              type="submit"
              @click="loginUser()"
            >Login</v-btn>
          </v-col>
        </v-row>
      </v-form>

    </div>
  </v-layout>
</template>

<script>
export default {
  data: function() {
    return {
      methodLoginValue: '',
      isAuthorised: false,
      value:''
    }
  },
  mounted() {
    this.isAuthorised = this.$passwordProtect.isAuthorised()
  },
  methods: {
    loginUser() {
      this.$passwordProtect.authorise(this.methodLoginValue)
      this.isAuthorised = this.$passwordProtect.isAuthorised()
    },
    removeAuthorisation() {
      this.$passwordProtect.removeAuthorisation()
      this.isAuthorised = this.$passwordProtect.isAuthorised()
    }
  }
}
</script>
