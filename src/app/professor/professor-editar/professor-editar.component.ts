import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfessorService } from '../../services/professor.service';

@Component({
  selector: 'app-professor-editar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl:'./professor-editar.component.html',
  styleUrl: './professor-editar.component.css'
})
export class ProfessorEditarComponent implements OnInit {
  constructor(
    private professorService: ProfessorService,
    private route: ActivatedRoute,
    private router: Router) { }
    
  professor: any = {
    id: '',
    nome: '',
    biografia: ''
  }    
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); //Obtém o ID da URL
    if (id) {
      this.obterProfessor(id);
    }
  }

  obterProfessor(id: any) {
    this.professorService.obter(id).subscribe({
      next: response => {
        this.professor = response.dados;
      },
      error: error => {
        Swal.fire({
          title: 'Sistema Acadêmico', 
          text: 'Erro ao obter o professor.',
          icon: 'error', 
          confirmButtonText: 'OK'
        })
      }
    });
  }

  atualizar(form: NgForm) {
    if (this.professor.nome.length > 50) {
      form.controls['nome'].setErrors({ maxlength: true });
      return;
    }

    this.professorService.atualizar(this.professor).subscribe({
      next: response => {
        Swal.fire({
          title: 'Sistema Acadêmico',
          text: response.dados.mensagem,
          icon: 'success',
          confirmButtonText: 'OK'
        });

        this.router.navigate(['/professor/listar']); 
      },
      error: error => {
        Swal.fire({
          title: 'Sistema Acadêmico', 
          text: 'Erro ao atuzalizar o professor', //error.dados.mensagem, 
          icon: 'error', 
          confirmButtonText: 'OK'
        })   
      }
    })
  }  

  cancelar() {
    this.router.navigate(['/professor/listar']);     
  }
}
