<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn small fab class="primary" @click="loadData(task)" dark v-on="on">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title primary-title>Edit Task</v-card-title>
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
                  :rules= "[v => v.length >= 1 || 'Due date is required']"
                ></v-text-field>
              </template>
              <v-date-picker color="success" v-model="due"></v-date-picker>
            </v-menu>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn class="success mb-3 mr-5" :loading="loading" :disabled="!valid" @click="submit(task)">Save changes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
import db from '@/fb.js'
export default {
    props:['task'],
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
    loadData(t){
        this.title = t.title
        this.content = t.content
        this.due = t.due
    },
    submit(t) {
      if(this.$refs.form.validate()){
        this.loading = true;
        const task = {
          person: 'Ahmad Sameh',
          content: this.content,
          due: this.due,
          title:this.title,
          status:'Ongoing',
        }
        db.collection("tasks").doc(t.id).update(task).then(() => {
            this.loading = false;
            this.dialog = false;
            this.$emit('taskEdited')
            console.log("Document successfully updated!");})
        .catch(function(error) {
            console.error("Error updating document: ", error);});
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
