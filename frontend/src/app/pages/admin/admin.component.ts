import {Component, inject, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {UserModel} from '../../models/user/user.model';
import {AdminService} from '../../service/admin/admin.service';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Button} from '../../components/button/button';
import {UserStore} from '../../store/user.store';

@Component({
  selector: 'app-admin',
  imports: [
    MatTable,
    MatPaginator,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatHeaderRowDef,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatIcon,
    MatIconButton,
    RouterLink,
    MatNoDataRow,
    Button
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  protected users: MatTableDataSource<UserModel> = new MatTableDataSource(undefined);
  protected pageIndex = 0;
  protected pageSize = 10;
  protected readonly displayedColumns: string[] = ['id', 'email', 'roles', 'activated', 'actions'];
  protected totalLength = 0;
  private readonly adminService = inject(AdminService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);
  private readonly userStore = inject(UserStore);

  ngAfterViewInit() {
    this.load();
  }

  protected load(page: number = this.pageIndex, size: number = this.pageSize) {
    this.adminService.listUsers({size, page}).subscribe(res => {
      this.users.data = res.content || [];
      this.totalLength = res.totalElements;
    });
    }

  protected deleteUser(id: string) {
    this.adminService.deleteUser(id).subscribe(() => {
      this.snackBar.open('Deletado com sucesso!', 'Fechar', {duration: 3000, verticalPosition: "top"});
      this.load(0)
    })
  }

  protected redirectToCreate() {
    this.router.navigate(['/admin/user/create']).then();
  }

  protected logout() {
    this.userStore.clear();
    localStorage.removeItem('token');
    this.router.navigate(['/']).then();
  }
}
