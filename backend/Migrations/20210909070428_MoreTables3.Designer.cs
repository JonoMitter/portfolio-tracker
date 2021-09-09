﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using backend.Persistence;

namespace backend.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20210909070428_MoreTables3")]
    partial class MoreTables3
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.9");

            modelBuilder.Entity("backend.Models.Cash", b =>
                {
                    b.Property<Guid>("Holding_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Type")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("User_Id")
                        .HasColumnType("TEXT");

                    b.Property<float>("Value")
                        .HasColumnType("REAL");

                    b.HasKey("Holding_Id");

                    b.ToTable("cash");
                });

            modelBuilder.Entity("backend.Models.Crypto", b =>
                {
                    b.Property<Guid>("Holding_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Code")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<float>("Purchase_Price")
                        .HasColumnType("REAL");

                    b.Property<float>("Units")
                        .HasColumnType("REAL");

                    b.Property<Guid>("User_Id")
                        .HasColumnType("TEXT");

                    b.HasKey("Holding_Id");

                    b.ToTable("crypto");
                });

            modelBuilder.Entity("backend.Models.Stock", b =>
                {
                    b.Property<Guid>("Holding_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Code")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<float>("Purchase_Price")
                        .HasColumnType("REAL");

                    b.Property<int>("Units")
                        .HasColumnType("INTEGER");

                    b.Property<Guid>("User_Id")
                        .HasColumnType("TEXT");

                    b.HasKey("Holding_Id");

                    b.ToTable("stock");
                });

            modelBuilder.Entity("backend.Models.Super", b =>
                {
                    b.Property<Guid>("Holding_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Type")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("User_Id")
                        .HasColumnType("TEXT");

                    b.Property<float>("Value")
                        .HasColumnType("REAL");

                    b.HasKey("Holding_Id");

                    b.ToTable("super");
                });

            modelBuilder.Entity("backend.Models.User", b =>
                {
                    b.Property<Guid>("User_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasColumnType("TEXT");

                    b.Property<string>("FirstName")
                        .HasColumnType("TEXT");

                    b.Property<string>("Password")
                        .HasColumnType("TEXT");

                    b.HasKey("User_Id");

                    b.ToTable("user");
                });
#pragma warning restore 612, 618
        }
    }
}
