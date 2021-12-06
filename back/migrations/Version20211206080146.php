<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211206080146 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE category (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(128) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE category_sport (category_id INT NOT NULL, sport_id INT NOT NULL, INDEX IDX_F2B6A09B12469DE2 (category_id), INDEX IDX_F2B6A09BAC78BCF8 (sport_id), PRIMARY KEY(category_id, sport_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE comment (id INT AUTO_INCREMENT NOT NULL, post_id INT NOT NULL, user_id INT NOT NULL, content LONGTEXT NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, INDEX IDX_9474526C4B89032C (post_id), INDEX IDX_9474526CA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE post (id INT AUTO_INCREMENT NOT NULL, sport_id INT NOT NULL, author_id INT NOT NULL, title VARCHAR(128) NOT NULL, slug VARCHAR(128) NOT NULL, active TINYINT(1) NOT NULL, description LONGTEXT NOT NULL, level INT DEFAULT NULL, location VARCHAR(128) NOT NULL, min_participants INT DEFAULT NULL, max_participants INT DEFAULT NULL, event_date DATETIME NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, INDEX IDX_5A8A6C8DAC78BCF8 (sport_id), INDEX IDX_5A8A6C8DF675F31B (author_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE post_user (post_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_44C6B1424B89032C (post_id), INDEX IDX_44C6B142A76ED395 (user_id), PRIMARY KEY(post_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE practices (id INT AUTO_INCREMENT NOT NULL, sport_id INT DEFAULT NULL, practitioner_id INT DEFAULT NULL, level INT DEFAULT NULL, INDEX IDX_8A154FA8AC78BCF8 (sport_id), INDEX IDX_8A154FA81121EA2C (practitioner_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE sport (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(128) NOT NULL, slug VARCHAR(128) NOT NULL, picture VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, username VARCHAR(128) NOT NULL, slug VARCHAR(128) NOT NULL, picture VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, location VARCHAR(128) DEFAULT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE category_sport ADD CONSTRAINT FK_F2B6A09B12469DE2 FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE category_sport ADD CONSTRAINT FK_F2B6A09BAC78BCF8 FOREIGN KEY (sport_id) REFERENCES sport (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526C4B89032C FOREIGN KEY (post_id) REFERENCES post (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526CA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE post ADD CONSTRAINT FK_5A8A6C8DAC78BCF8 FOREIGN KEY (sport_id) REFERENCES sport (id)');
        $this->addSql('ALTER TABLE post ADD CONSTRAINT FK_5A8A6C8DF675F31B FOREIGN KEY (author_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE post_user ADD CONSTRAINT FK_44C6B1424B89032C FOREIGN KEY (post_id) REFERENCES post (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE post_user ADD CONSTRAINT FK_44C6B142A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE practices ADD CONSTRAINT FK_8A154FA8AC78BCF8 FOREIGN KEY (sport_id) REFERENCES sport (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE practices ADD CONSTRAINT FK_8A154FA81121EA2C FOREIGN KEY (practitioner_id) REFERENCES user (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE category_sport DROP FOREIGN KEY FK_F2B6A09B12469DE2');
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526C4B89032C');
        $this->addSql('ALTER TABLE post_user DROP FOREIGN KEY FK_44C6B1424B89032C');
        $this->addSql('ALTER TABLE category_sport DROP FOREIGN KEY FK_F2B6A09BAC78BCF8');
        $this->addSql('ALTER TABLE post DROP FOREIGN KEY FK_5A8A6C8DAC78BCF8');
        $this->addSql('ALTER TABLE practices DROP FOREIGN KEY FK_8A154FA8AC78BCF8');
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526CA76ED395');
        $this->addSql('ALTER TABLE post DROP FOREIGN KEY FK_5A8A6C8DF675F31B');
        $this->addSql('ALTER TABLE post_user DROP FOREIGN KEY FK_44C6B142A76ED395');
        $this->addSql('ALTER TABLE practices DROP FOREIGN KEY FK_8A154FA81121EA2C');
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE category_sport');
        $this->addSql('DROP TABLE comment');
        $this->addSql('DROP TABLE post');
        $this->addSql('DROP TABLE post_user');
        $this->addSql('DROP TABLE practices');
        $this->addSql('DROP TABLE sport');
        $this->addSql('DROP TABLE user');
    }
}
