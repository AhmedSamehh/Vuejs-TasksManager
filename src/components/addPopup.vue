<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn class="success" dark v-on="on">Add New Task</v-btn>
      </template>
      <v-card>
        <v-card-title primary-title>Add a New Task</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="title"
              color="success"
              counter="25"
              label="Task title"
              prepend-icon="mdi-content-paste"
              :rules= "[v => (v && v.length >= 3 && v.length <= 25) || 'Title length should be between 3 and 25 characters']"
            >
            </v-text-field>
            <v-textarea
              v-model="content"
              color="success"
              label="Description"
              prepend-icon="mdi-lead-pencil"
              :rules= "[v => (v && v.length >= 10) || 'Description length should be 10 or more characters']"
            >
            </v-textarea>
            <v-menu max-width="290">
              <template v-slot:activator="{ on }">
                <v-text-field
                  color="success"
                  :value="formattedDate"
                  readonly
                  label="Due date"
                  prepend-icon="mdi-calendar-range"
                  v-on="on"
                  :rules= "[v => (v && v.length >= 1) || 'Due date is required']"
                ></v-text-field>
              </template>
              <v-date-picker color="success" v-model="due"></v-date-picker>
            </v-menu>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn class="success mb-3 mr-5" :loading="loading" :disabled="!valid" @click="submit">Add task</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
import db from '@/fb.js'
export default {
  data() {
    return {
      title: "",
      content: "",
      due: null,
      valid: true,
      loading:false,
      dialog:false,
    };
  },
  methods: {
    submit() {
      if(this.$refs.form.validate()){
        this.loading = true;
        const task = {
          person: 'Ahmad Sameh',
          content: this.content,
          due: this.due,
          title:this.title,
          status:'Ongoing',
        }
        db.collection('tasks').add(task).then(() => {
          this.loading = false;
          this.dialog = false;
          this.$emit('taskAdded')
          this.$refs.form.reset()
        })
      }
    },
  },
  computed: {
    formattedDate() {
      return this.due ? moment(this.due).format("Do MMMM YYYY") : "";
    },
  },
};
</script>

<style></style>
