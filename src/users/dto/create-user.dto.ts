export class CreateUserDto {
    name: string;
    email: string;
    phone?: string;
    role?: string;
  }

  //name dan email wajib diisi dikarenakan itu bagian penting ketika menambahkan pengguna
  //phone dan role (optional) dikarenakan itu gak wajib di isi ya, biasanya ditandai dengan tanda (?)