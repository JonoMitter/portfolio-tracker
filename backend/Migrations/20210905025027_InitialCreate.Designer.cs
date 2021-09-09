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
    [Migration("20210905025027_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.9");

            modelBuilder.Entity("backend.Models.Holding", b =>
                {
                    b.Property<Guid>("Holding_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<Guid?>("User_Id")
                        .HasColumnType("TEXT");

                    b.HasKey("Holding_Id");

                    b.HasIndex("User_Id");

                    b.ToTable("Holding");

                    b.HasDiscriminator<string>("Discriminator").HasValue("Holding");
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

            modelBuilder.Entity("backend.Models.Cash", b =>
                {
                    b.HasBaseType("backend.Models.Holding");

                    b.Property<string>("Type")
                        .HasColumnType("TEXT");

                    b.Property<float>("Value")
                        .HasColumnType("REAL");

                    b.HasDiscriminator().HasValue("Cash");
                });

            modelBuilder.Entity("backend.Models.Crypto", b =>
                {
                    b.HasBaseType("backend.Models.Holding");

                    b.Property<string>("Code")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<float>("Purchase_Price")
                        .HasColumnType("REAL");

                    b.Property<float>("Units")
                        .HasColumnType("REAL");

                    b.HasDiscriminator().HasValue("Crypto");
                });

            modelBuilder.Entity("backend.Models.Stock", b =>
                {
                    b.HasBaseType("backend.Models.Holding");

                    b.Property<string>("Code")
                        .HasColumnType("TEXT")
                        .HasColumnName("Stock_Code");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT")
                        .HasColumnName("Stock_Name");

                    b.Property<float>("Purchase_Price")
                        .HasColumnType("REAL")
                        .HasColumnName("Stock_Purchase_Price");

                    b.Property<int>("Units")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Stock_Units");

                    b.HasDiscriminator().HasValue("Stock");
                });

            modelBuilder.Entity("backend.Models.Super", b =>
                {
                    b.HasBaseType("backend.Models.Holding");

                    b.Property<string>("Type")
                        .HasColumnType("TEXT")
                        .HasColumnName("Super_Type");

                    b.Property<float>("Value")
                        .HasColumnType("REAL")
                        .HasColumnName("Super_Value");

                    b.HasDiscriminator().HasValue("Super");
                });

            modelBuilder.Entity("backend.Models.Holding", b =>
                {
                    b.HasOne("backend.Models.User", "User")
                        .WithMany("Holdings")
                        .HasForeignKey("User_Id");

                    b.Navigation("User");
                });

            modelBuilder.Entity("backend.Models.User", b =>
                {
                    b.Navigation("Holdings");
                });
#pragma warning restore 612, 618
        }
    }
}