<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221212144319 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE adress (id INT AUTO_INCREMENT NOT NULL, line1 VARCHAR(100) DEFAULT NULL, line2 VARCHAR(100) DEFAULT NULL, line3 VARCHAR(100) DEFAULT NULL, postal_code VARCHAR(10) DEFAULT NULL, city VARCHAR(50) DEFAULT NULL, country VARCHAR(50) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE crypto (id INT AUTO_INCREMENT NOT NULL, symbol VARCHAR(50) NOT NULL, base_asset VARCHAR(50) NOT NULL, quote_asset VARCHAR(50) NOT NULL, is_home TINYINT(1) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE flux_article (id INT AUTO_INCREMENT NOT NULL, url LONGTEXT NOT NULL, is_home TINYINT(1) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE flux_article_user (id INT AUTO_INCREMENT NOT NULL, flux_id INT NOT NULL, user_id INT NOT NULL, is_favorite TINYINT(1) NOT NULL, INDEX IDX_74EF3C3C85926E (flux_id), INDEX IDX_74EF3C3A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, uuid VARCHAR(255) NOT NULL, username VARCHAR(30) NOT NULL, name VARCHAR(30) NOT NULL, lastname VARCHAR(30) NOT NULL, email VARCHAR(100) NOT NULL, password VARCHAR(255) DEFAULT NULL, is_verified TINYINT(1) NOT NULL, avatar LONGTEXT DEFAULT NULL, token LONGTEXT DEFAULT NULL, google_id VARCHAR(255) DEFAULT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', UNIQUE INDEX UNIQ_8D93D649D17F50A6 (uuid), UNIQUE INDEX UNIQ_8D93D649F85E0677 (username), UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), UNIQUE INDEX UNIQ_8D93D6495F37A13B (token), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_adress (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, adress_id INT NOT NULL, is_principal TINYINT(1) NOT NULL, INDEX IDX_39BEDC83A76ED395 (user_id), INDEX IDX_39BEDC838486F9AC (adress_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_crypto (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, crypto_id INT DEFAULT NULL, is_home TINYINT(1) NOT NULL, is_favorite TINYINT(1) NOT NULL, INDEX IDX_D7A33B8A76ED395 (user_id), INDEX IDX_D7A33B8E9571A63 (crypto_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE flux_article_user ADD CONSTRAINT FK_74EF3C3C85926E FOREIGN KEY (flux_id) REFERENCES flux_article (id)');
        $this->addSql('ALTER TABLE flux_article_user ADD CONSTRAINT FK_74EF3C3A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE user_adress ADD CONSTRAINT FK_39BEDC83A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE user_adress ADD CONSTRAINT FK_39BEDC838486F9AC FOREIGN KEY (adress_id) REFERENCES adress (id)');
        $this->addSql('ALTER TABLE user_crypto ADD CONSTRAINT FK_D7A33B8A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE user_crypto ADD CONSTRAINT FK_D7A33B8E9571A63 FOREIGN KEY (crypto_id) REFERENCES crypto (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE flux_article_user DROP FOREIGN KEY FK_74EF3C3C85926E');
        $this->addSql('ALTER TABLE flux_article_user DROP FOREIGN KEY FK_74EF3C3A76ED395');
        $this->addSql('ALTER TABLE user_adress DROP FOREIGN KEY FK_39BEDC83A76ED395');
        $this->addSql('ALTER TABLE user_adress DROP FOREIGN KEY FK_39BEDC838486F9AC');
        $this->addSql('ALTER TABLE user_crypto DROP FOREIGN KEY FK_D7A33B8A76ED395');
        $this->addSql('ALTER TABLE user_crypto DROP FOREIGN KEY FK_D7A33B8E9571A63');
        $this->addSql('DROP TABLE adress');
        $this->addSql('DROP TABLE crypto');
        $this->addSql('DROP TABLE flux_article');
        $this->addSql('DROP TABLE flux_article_user');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE user_adress');
        $this->addSql('DROP TABLE user_crypto');
    }
}
