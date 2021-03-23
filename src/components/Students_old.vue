<template>
<v-container>
    <h1>Student Management UI</h1>
    <p>This UI developed to handle Student Registration.</p>
    <v-row>
      <v-col sm="12">
        <v-alert v-if="responseSuccess" dense text type="success">
          You have successfully added student.
        </v-alert>
      </v-col>
      <v-col sm="12">
        <h3>Student Registration</h3>
        <v-text-field
          v-model="studentRegistration.name"
          label="Name"
        ></v-text-field>
        <v-text-field
          v-model="studentRegistration.email"
          label="Email"
        ></v-text-field>
        <v-text-field
          v-model="studentRegistration.cpf"
          label="CPF"
        ></v-text-field>
        <v-text-field
          v-model="studentRegistration.ra"
          label="RA"
        ></v-text-field>
        <v-btn color="primary" v-on:click="createStudent">
          Register
        </v-btn>
      </v-col>
      <v-col sm="12">
        <h3>Registered Students</h3>
        <v-data-table
            :headers="headers"
            :items="registeredStudents"
            :items-per-page="5"
            loading
            loading-text="Carregando... Aguarde!"
            class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import api from "@/service/apiService";

export default {
  name: "Student",
  data() {
    return {
        studentRegistration: {
            name: "",
            email: "",
            cpf: "",
            ra: "",
        },
        headers: [
          {
            text: 'ID',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          { text: 'Name', value: 'name' },
          { text: 'E-mail', value: 'email' },
          { text: 'CPF', value: 'cpf' },
          { text: 'RA', value: 'ra' },
        ],
        registeredStudents: [],
        responseSuccess: false,
      }
    },
  
  methods: {
    readStudents: async function() {
      const data = await api.readStudents();
      this.registeredStudents = data.data;
    },
    createStudent: async function() {
      const requestData = {
        name: this.studentRegistration.name,
        email: this.studentRegistration.email,
        cpf: this.studentRegistration.cpf,
        ra: this.studentRegistration.ra,
      };
      await api.createStudent(requestData);
      this.studentRegistration.name = "";
      this.studentRegistration.email = "";
      this.studentRegistration.cpf = "";
      this.studentRegistration.ra = "";
      this.readStudents();
      this.responseSuccess = true;
    },
  },
  mounted() {
    this.readStudents();
  },
};
</script>